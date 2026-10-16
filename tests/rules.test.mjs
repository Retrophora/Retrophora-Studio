// SPDX-License-Identifier: AGPL-3.0-only
import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {createDraft} from '../src/rules.js';
const base = {id:'premiere_victoire',title:'Première victoire',address:'0xC120',value:'1',operator:'changed_to',points:'10'};
test('creates a versioned valid draft', () => {
  const draft = createDraft(base);
  assert.equal(draft.schema, 'retrophora.draft-0.1');
  assert.deepEqual(draft.conditions.all, [{address:'0xC120',width:8,operator:'changed_to',value:1}]);
  assert.equal(draft.points, 10);
});
test('rejects invalid memory address or overflow', () => {
  assert.throws(() => createDraft({...base,address:'0x100000000'}));
  assert.throws(() => createDraft({...base,value:'256'}));
  assert.throws(() => createDraft({...base,points:'-1'}));
  assert.throws(() => createDraft({...base,operator:'eval'}));
});
test('rejects invalid identifiers', () => {
  assert.throws(() => createDraft({...base,id:'../path'}));
  assert.throws(() => createDraft({...base,id:'A'}));
});
