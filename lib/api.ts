import {validatePair} from '../shared/rules.mjs';
const products=Array.from({length:20},(_,i)=>{const n=i%10+1,parent=i<10,failed=parent&&n===5;return {id:`demo-${i}`,serialNumber:`ARC-26-${parent?'A':'B'}${String(n).padStart(3,'0')}`,productCode:`${parent?'A':'B'}${n}`,productName:parent?'Exhaust parent assembly':'Exhaust child component',lineCode:'P7',productionOrderId:'PO-260905-007',productType:'EXHAUST-X',componentType:parent?'PARENT':'CHILD',currentStage:failed?'REJECTED':'ASSEMBLY',overallStatus:failed?'FAILED':'PASSED',inspections:['SERIAL_PRINTING','LEAKAGE','FIRE_RESISTANCE','QUALITY'].map((stage,j)=>({stage,result:failed&&j===3?'FAIL':'PASS',inspectedAt:`2026-09-05T0${j+6}:00:00Z`}))};});
const relationships=[{parentProductId:'demo-4',childProductId:'demo-14',relationshipStatus:'RESERVED'}];
/** Read-only sample adapter. No live factory data is stored or submitted. */
export async function request(path:string,method:string,body:{parentSerial:string,childSerial:string}){
 if(path!=='/traceability/validate'||method!=='POST')throw new Error('Unsupported sample operation.');
 if(!body.parentSerial?.trim()||!body.childSerial?.trim())throw new Error('Enter both serial numbers.');
 const parent=products.find(p=>p.serialNumber===body.parentSerial),child=products.find(p=>p.serialNumber===body.childSerial);
 return {...validatePair(parent,child,relationships),parent,child};
}
