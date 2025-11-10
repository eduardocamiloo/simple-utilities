import Decimal from "decimal.js";

export function safeDecimal(value) {
  const num = Number(value);
  return isNaN(num) ? new Decimal(0) : new Decimal(num);
}

export function normalizeValue(value) {
  if (value === null || value === undefined || value === '') return '0,00';

  const num = Number(value);

  if (isNaN(num)) return '0,00';

  return num.toFixed(2).replace('.', ',');
}
