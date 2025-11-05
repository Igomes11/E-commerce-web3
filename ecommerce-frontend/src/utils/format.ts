export function formatPrice(value: number | string | null | undefined): string {
  if (value === null || value === undefined) return '0.00';
  const n = typeof value === 'string' ? parseFloat(value) : (value as number);
  return Number.isFinite(n) ? Number(n).toFixed(2) : '0.00';
}
