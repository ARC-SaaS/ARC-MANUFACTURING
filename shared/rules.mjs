export const STAGES=['SERIAL_PRINTING','LEAKAGE','FIRE_RESISTANCE','QUALITY','OUTPUT'];
export const QUALITY_KEYS=['dimensions','welding','surface','shape','fitting','components','visual'];
export function ensure(condition,message,status=409){if(!condition){const error=new Error(message);error.status=status;throw error;}}
export function passedRequired(product){return ['SERIAL_PRINTING','LEAKAGE','FIRE_RESISTANCE','QUALITY'].every(stage=>{const history=(product.inspections||[]).filter(i=>i.stage===stage).sort((a,b)=>new Date(b.inspectedAt)-new Date(a.inspectedAt));return history[0]?.result==='PASS';});}
export function validatePair(parent,child,relationships=[]){
 const block=reason=>({assembly_allowed:false,reason,parent_status:parent?.overallStatus??'NOT_FOUND',child_status:child?.overallStatus??'NOT_FOUND'});
 if(!parent)return block('Parent serial number was not found.');if(!child)return block('Child serial number was not found.');
 if(parent.id===child.id||parent.componentType!=='PARENT'||child.componentType!=='CHILD')return block('Select a parent and a child component.');
 if(['FAILED','REJECTED','REPAIR_PENDING','REPAIR_COMPLETED'].includes(parent.overallStatus))return block('Parent product has failed inspection. Child component cannot be assigned to this parent.');
 if(['RESERVED','FITTED','OUTPUT'].includes(child.overallStatus)||relationships.some(r=>r.childProductId===child.id&&r.relationshipStatus!=='CANCELLED'))return block('Child component is already assigned.');
 if(relationships.some(r=>r.parentProductId===parent.id&&r.relationshipStatus!=='CANCELLED'))return block('Parent already has an active child assignment.');
 if(!passedRequired(parent)||!passedRequired(child))return block('Both components must pass all required inspections.');
 if(parent.overallStatus!=='PASSED'||child.overallStatus!=='PASSED')return block('Both components must be eligible for assembly.');
 if(parent.productType!==child.productType)return block('Product types are not compatible.');
 if(parent.productionOrderId!==child.productionOrderId)return block('Production orders are not compatible.');
 if(parent.lineCode!=='P7'||child.lineCode!=='P7')return block('Assembly components must be routed to P7.');
 return {assembly_allowed:true,reason:'MATCH VERIFIED — ASSEMBLY AUTHORIZED',parent_status:parent.overallStatus,child_status:child.overallStatus};
}
export function inspectProduct(product,input,assemblyComplete=false){
 ensure(STAGES.includes(input.stage),'Invalid inspection stage.',400);ensure(['PASS','FAIL'].includes(input.result),'Choose PASS or FAIL.',400);
 ensure(product.currentStage===input.stage,'Inspection stages cannot be skipped. Expected '+product.currentStage+'.');
 ensure(!['OUTPUT','FITTED','RESERVED','FAILED','REJECTED','REPAIR_PENDING'].includes(product.overallStatus),'Product is not eligible for inspection.');
 if(input.stage==='QUALITY'){ensure(QUALITY_KEYS.every(k=>['PASS','FAIL'].includes(input.checks?.[k])),'Complete all seven quality checks.',400);ensure(input.result===(QUALITY_KEYS.every(k=>input.checks[k]==='PASS')?'PASS':'FAIL'),'Overall result must match the checklist.',400);}
 if(input.result==='FAIL')ensure(input.failureReason?.trim(),'Failure reason is required.',400);
 if(input.stage==='OUTPUT'){ensure(passedRequired(product),'All prior stages must pass before output.');ensure(product.lineCode!=='P7'||product.componentType==='PARENT'&&assemblyComplete,'P7 requires completed parent assembly before output.');}
 if(input.result==='FAIL')return {currentStage:'REJECTED',overallStatus:'FAILED'};
 if(input.stage==='OUTPUT')return {currentStage:'OUTPUT',overallStatus:'OUTPUT'};
 return {currentStage:input.stage==='QUALITY'&&product.lineCode==='P7'?'ASSEMBLY':STAGES[STAGES.indexOf(input.stage)+1],overallStatus:input.stage==='QUALITY'?'PASSED':'IN_PROGRESS'};
}
export function remaining(receipt){const values=[receipt.quantityReceived,receipt.quantityUsed,receipt.quantityRejected];ensure(values.every(n=>Number.isFinite(n)&&n>=0),'Quantities must be nonnegative numbers.',400);const result=values[0]-values[1]-values[2];ensure(result>=0,'Used and rejected quantities exceed received stock.',400);return result;}
