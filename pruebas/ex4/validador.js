export function esNumero(valor) {
  const s = String(valor ?? '').trim();
  return /^\d+$/.test(s);
}

export function longitudExacta(valor, mida) {
  const s = String(valor ?? '').trim();
  return s.length === Number(mida);
}
