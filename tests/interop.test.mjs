// SPDX-License-Identifier: AGPL-3.0-only
import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {readFileSync} from 'node:fs';
import {createDraft} from '../src/rules.js';

const example = {
  id: 'premiere_victoire', title: 'Première victoire', address: '0xC120',
  value: '1', operator: 'changed_to', points: '10'
};
const fixture = JSON.parse(readFileSync(new URL('./fixtures/studio_export.json', import.meta.url), 'utf8'));

test('Studio export matches the versioned fixture read by the C++ engine', () => {
  assert.deepEqual(createDraft(example), fixture);
});

test('Studio handles Unicode title lengths by code points', () => {
  assert.equal(createDraft({...example,title:'🎮'.repeat(100)}).title.length, 200);
  assert.throws(() => createDraft({...example,title:'🎮'.repeat(101)}));
  assert.throws(() => createDraft({...example,title:'\uD800'}));
  assert.throws(() => createDraft({...example,title:'A\nB'}));
});

test('Studio exports canonical 32-bit addresses and strict integers', () => {
  assert.equal(createDraft({...example,address:'0x0000ffff'}).conditions.all[0].address, '0xFFFF');
  assert.equal(createDraft({...example,address:'0x00000000'}).conditions.all[0].address, '0x0');
  assert.throws(() => createDraft({...example,points:'1.0'}));
});
