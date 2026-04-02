import { simulateApiCall } from './client';
import { useStore } from '@/store';
import {
  computeDashboardSummary,
  computeMonthlyTrend,
  computeCategoryBreakdown,
  computeInsights,
} from '@/utils/calculations';
import type { DashboardSummary, MonthlyDataPoint, CategoryDataPoint, Insight } from '@/types';

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const transactions = useStore.getState().transactions;
  return simulateApiCall(computeDashboardSummary(transactions), 500);
}

export async function getMonthlyTrend(): Promise<MonthlyDataPoint[]> {
  const transactions = useStore.getState().transactions;
  return simulateApiCall(computeMonthlyTrend(transactions), 600);
}

export async function getCategoryBreakdown(): Promise<CategoryDataPoint[]> {
  const transactions = useStore.getState().transactions;
  return simulateApiCall(computeCategoryBreakdown(transactions), 550);
}

export async function getInsights(): Promise<Insight[]> {
  const transactions = useStore.getState().transactions;
  return simulateApiCall(computeInsights(transactions), 500);
}
