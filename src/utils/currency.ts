export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);

export const parseAmount = (val: string) => Number(val.replace(/\D/g, '')) || 0;
