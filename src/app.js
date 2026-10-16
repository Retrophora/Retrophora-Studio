// SPDX-License-Identifier: AGPL-3.0-only
import {createDraft} from './rules.js';
const form = document.querySelector('#rule-form');
const preview = document.querySelector('#preview');
const error = document.querySelector('#error');
let currentDraft;
function update(event) {
  event?.preventDefault();
  try {
    const fields = Object.fromEntries(new FormData(form));
    currentDraft = createDraft(fields);
    preview.textContent = JSON.stringify(currentDraft, null, 2);
    error.textContent = '';
  } catch (err) {
    currentDraft = undefined;
    preview.textContent = 'Aucun brouillon valide.';
    error.textContent = err.message;
  }
}
form.addEventListener('submit', update);
document.querySelector('#export').addEventListener('click', () => {
  update();
  if (!currentDraft) return;
  const blob = new Blob([JSON.stringify(currentDraft, null, 2) + '\n'], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${currentDraft.id}.json`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
update();
