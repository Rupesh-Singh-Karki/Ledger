import { simulateApiCall } from './client';
import { useStore } from '@/store';
import { applyFilters } from '@/utils/calculations';
import type { Transaction, TransactionFormData, TransactionFilters } from '@/types';

export async function getTransactions(filters?: TransactionFilters): Promise<Transaction[]> {
  const transactions = useStore.getState().transactions;
  if (filters) {
    return simulateApiCall(applyFilters(transactions, filters), 450);
  }
  return simulateApiCall(transactions, 450);
}

export async function getTransactionById(id: string): Promise<Transaction | undefined> {
  const transactions = useStore.getState().transactions;
  const transaction = transactions.find((t) => t.id === id);
  return simulateApiCall(transaction, 300);
}

export async function addTransaction(data: TransactionFormData): Promise<boolean> {
  await simulateApiCall(null, 400);
  useStore.getState().addTransaction(data);
  return true;
}

export async function editTransaction(id: string, updates: Partial<Transaction>): Promise<boolean> {
  await simulateApiCall(null, 400);
  useStore.getState().editTransaction(id, updates);
  return true;
}

export async function deleteTransaction(id: string): Promise<boolean> {
  await simulateApiCall(null, 400);
  useStore.getState().deleteTransaction(id);
  return true;
}
