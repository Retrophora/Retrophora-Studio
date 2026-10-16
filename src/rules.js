// SPDX-License-Identifier: AGPL-3.0-only
export function createDraft({id, title, address, value, operator, points}) {
  id = String(id ?? "").trim();
  title = String(title ?? "").trim();
  if (!/^[a-z][a-z0-9_]{2,63}$/.test(id)) throw new Error("Identifiant invalide : 3–64 caractères minuscules, chiffres ou _ ; commence par une lettre.");
  if (title.length < 1 || title.length > 100) throw new Error("Le titre doit contenir 1 à 100 caractères.");
  const addr = String(address ?? "").trim();
  if (!/^0x[0-9a-f]{1,8}$/i.test(addr)) throw new Error("Adresse hexadécimale attendue, exemple 0xC120.");
  const checkedInteger = (input, min, max, field) => {
    const raw = String(input ?? "").trim();
    if (!/^(0|[1-9][0-9]*)$/.test(raw)) throw new Error(`${field} doit être un entier.`);
    const result = Number(raw);
    if (!Number.isSafeInteger(result) || result < min || result > max) throw new Error(`${field} hors limites (${min}–${max}).`);
    return result;
  };
  const val = checkedInteger(value, 0, 255, "Valeur");
  const pts = checkedInteger(points, 0, 1000, "Points");
  if (!['equal', 'changed_to'].includes(operator)) throw new Error("Opérateur non pris en charge.");
  return {
    schema: 'retrophora.draft-0.1',
    id, title, points: pts,
    conditions: {all: [{address: `0x${Number.parseInt(addr.slice(2), 16).toString(16).toUpperCase()}`, width: 8, operator, value: val}]}
  };
}
