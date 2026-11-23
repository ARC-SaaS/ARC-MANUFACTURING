import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {request} from '../lib/api.ts';
import {passedRequired,validatePair} from '../shared/rules.mjs';

const verify=(parentSerial,childSerial)=>request('/traceability/validate','POST',{parentSerial,childSerial});
test('manual and tool inputs share normalization and remain read-only',async()=>{
 const first=await verify('ARC-26-A001','ARC-26-B002');
 assert.equal(first.assembly_allowed,true);
 assert.deepEqual(await verify(' ARC-26-A001 ',' ARC-26-B002 '),first);
 assert.deepEqual(await verify('ARC-26-A001','ARC-26-B002'),first);
 await assert.rejects(verify(' ','ARC-26-B001'),/Enter both/);
 await assert.rejects(verify(12,'ARC-26-B001'),/strings/);
});
test('failed, reserved, unknown and reversed parts remain blocked',async()=>{
 for(const pair of [['ARC-26-A005','ARC-26-B001'],['ARC-26-A001','ARC-26-B005'],['missing','ARC-26-B001'],['ARC-26-B001','ARC-26-A001']])assert.equal((await verify(...pair)).assembly_allowed,false);
});
test('stage and required compatibility fields fail closed',async()=>{
 const {parent,child}=await verify('ARC-26-A001','ARC-26-B001');
 for(const change of [{currentStage:'OUTPUT'},{productType:''},{productionOrderId:''},{lineCode:'P8'}])assert.equal(validatePair(parent,{...child,...change}).assembly_allowed,false);
});
test('missing, invalid, duplicate and latest failed inspections block',async()=>{
 const {parent}=await verify('ARC-26-A001','ARC-26-B001');
 assert.equal(passedRequired({...parent,inspections:parent.inspections.slice(1)}),false);
 for(const inspectedAt of ['invalid',parent.inspections[0].inspectedAt])assert.equal(passedRequired({...parent,inspections:[...parent.inspections,{...parent.inspections[0],inspectedAt}]}),false);
 const fail={...parent.inspections[0],result:'FAIL',inspectedAt:'2026-09-06T06:00:00Z'};
 assert.equal(passedRequired({...parent,inspections:[fail,...parent.inspections]}),false);
 assert.equal(passedRequired({...parent,inspections:[{...fail,result:'PASS',inspectedAt:'2026-09-07T06:00:00Z'},fail,...parent.inspections]}),true);
});
test('one-child policy and cancelled relationship handling remain intact',async()=>{
 const {parent,child}=await verify('ARC-26-A001','ARC-26-B001');
 for(const assignment of [{parentProductId:parent.id,childProductId:'other'},{parentProductId:'other',childProductId:child.id}]){
  assert.equal(validatePair(parent,child,[{...assignment,relationshipStatus:'RESERVED'}]).assembly_allowed,false);
  assert.equal(validatePair(parent,child,[{...assignment,relationshipStatus:'CANCELLED'}]).assembly_allowed,true);
 }
});
test('theme, animations, assets, metadata and build architecture are unchanged',()=>{
 const baseline=JSON.parse(readFileSync(new URL('./preservation-baseline.json',import.meta.url),'utf8'));
 for(const [path,hash] of Object.entries(baseline))assert.equal(createHash('sha256').update(readFileSync(path)).digest('hex'),hash,path);
});
