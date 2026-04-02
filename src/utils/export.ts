import type { Transaction } from '@/types';

export function exportToCSV(transactions: Transaction[], filename?: string): void {
  const headers = ['Date', 'Description', 'Merchant', 'Category', 'Type', 'Amount', 'Status'];

  const rows = transactions.map((t) => [
    t.date,
    `"${t.description}"`,
    `"${t.merchant}"`,
    t.category,
    t.type,
    `$${t.amount.toFixed(2)}`,
    t.status,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  const today = new Date().toISOString().split('T')[0];
  link.href = url;
  link.download = filename || `ledger-transactions-${today}.csv`;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
