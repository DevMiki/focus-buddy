export function roundNumber(value: number, decimalPlaces = 0): number {
  if (!Number.isFinite(value)) throw new TypeError('Invalid number');
  return parseFloat(value.toFixed(decimalPlaces));
}
