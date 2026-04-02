import type { Transaction, DashboardSummary, MonthlyDataPoint, CategoryDataPoint, Insight, TransactionFilters } from '@/types';
import { EXPENSE_CATEGORIES, CHART_COLORS } from '@/data/categories';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import { format, parseISO } from 'date-fns';

export function computeDashboardSummary(transactions: Transaction[]): DashboardSummary {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  // Get current and previous month data for percentage changes
  const months = getMonthKeys(transactions);
  const currentMonth = months[months.length - 1];
  const previousMonth = months.length > 1 ? months[months.length - 2] : null;

  const currentMonthTxn = transactions.filter((t) => getMonthKey(t.date) === currentMonth);
  const previousMonthTxn = previousMonth
    ? transactions.filter((t) => getMonthKey(t.date) === previousMonth)
    : [];

  const currentIncome = currentMonthTxn.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const previousIncome = previousMonthTxn.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);

  const currentExpense = currentMonthTxn.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const previousExpense = previousMonthTxn.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  const incomeChange = previousIncome > 0 ? ((currentIncome - previousIncome) / previousIncome) * 100 : 0;
  const expenseChange = previousExpense > 0 ? ((currentExpense - previousExpense) / previousExpense) * 100 : 0;

  const currentBalance = currentIncome - currentExpense;
  const previousBalance = previousIncome - previousExpense;
  const balanceChange = previousBalance !== 0 ? ((currentBalance - previousBalance) / Math.abs(previousBalance)) * 100 : 0;

  return { totalBalance, totalIncome, totalExpenses, incomeChange, expenseChange, balanceChange };
}

function getMonthKey(dateString: string): string {
  return format(parseISO(dateString), 'yyyy-MM');
}

function getMonthKeys(transactions: Transaction[]): string[] {
  const months = new Set(transactions.map((t) => getMonthKey(t.date)));
  return Array.from(months).sort();
}

export function computeMonthlyTrend(transactions: Transaction[]): MonthlyDataPoint[] {
  const monthMap = new Map<string, { income: number; expenses: number }>();

  transactions.forEach((t) => {
    const key = getMonthKey(t.date);
    const existing = monthMap.get(key) || { income: 0, expenses: 0 };
    if (t.type === 'income') {
      existing.income += t.amount;
    } else {
      existing.expenses += t.amount;
    }
    monthMap.set(key, existing);
  });

  const sortedMonths = Array.from(monthMap.entries()).sort(([a], [b]) => a.localeCompare(b));

  let runningBalance = 0;
  return sortedMonths.map(([monthKey, data]) => {
    runningBalance += data.income - data.expenses;
    return {
      month: format(parseISO(`${monthKey}-01`), 'MMM yyyy'),
      income: Math.round(data.income * 100) / 100,
      expenses: Math.round(data.expenses * 100) / 100,
      balance: Math.round(runningBalance * 100) / 100,
    };
  });
}

export function computeCategoryBreakdown(transactions: Transaction[]): CategoryDataPoint[] {
  const expenseTransactions = transactions.filter((t) => t.type === 'expense');
  const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

  const categoryMap = new Map<string, number>();
  expenseTransactions.forEach((t) => {
    categoryMap.set(t.category, (categoryMap.get(t.category) || 0) + t.amount);
  });

  const breakdown: CategoryDataPoint[] = Array.from(categoryMap.entries())
    .map(([category, amount]) => {
      const catConfig = EXPENSE_CATEGORIES.find((c) => c.name === category);
      const colorIndex = EXPENSE_CATEGORIES.findIndex((c) => c.name === category);
      return {
        category,
        amount: Math.round(amount * 100) / 100,
        percentage: totalExpenses > 0 ? Math.round((amount / totalExpenses) * 1000) / 10 : 0,
        color: catConfig?.color || CHART_COLORS[colorIndex % CHART_COLORS.length] || CHART_COLORS[0],
      };
    })
    .sort((a, b) => b.amount - a.amount);

  return breakdown;
}

export function computeInsights(transactions: Transaction[]): Insight[] {
  const insights: Insight[] = [];

  // Insight 1: Highest Spending Category
  const breakdown = computeCategoryBreakdown(transactions);
  if (breakdown.length > 0) {
    const top = breakdown[0];
    insights.push({
      id: 'insight-1',
      title: 'Top Spending Category',
      description: `${top.category} was your highest spending category, accounting for ${top.percentage}% of total expenses.`,
      value: formatCurrency(top.amount),
      icon: 'PieChart',
      trend: 'neutral',
    });
  }

  // Insight 2: Month-over-Month Expense Change
  const monthlyTrend = computeMonthlyTrend(transactions);
  if (monthlyTrend.length >= 2) {
    const current = monthlyTrend[monthlyTrend.length - 1];
    const previous = monthlyTrend[monthlyTrend.length - 2];
    const change = previous.expenses > 0
      ? ((current.expenses - previous.expenses) / previous.expenses) * 100
      : 0;
    const changeRounded = Math.round(Math.abs(change));
    const direction = change >= 0 ? 'up' : 'down';
    const directionText = change >= 0 ? 'increased' : 'decreased';

    insights.push({
      id: 'insight-2',
      title: 'Monthly Expense Trend',
      description: `Your expenses ${directionText} ${changeRounded}% in ${current.month} compared to ${previous.month}.`,
      value: `${change >= 0 ? '+' : '-'}${changeRounded}%`,
      icon: change >= 0 ? 'TrendingUp' : 'TrendingDown',
      trend: direction,
      trendValue: `${change >= 0 ? '+' : '-'}${changeRounded}%`,
    });
  }

  // Insight 3: Savings Rate
  const totalIncome = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const savings = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? Math.round((savings / totalIncome) * 100) : 0;

  insights.push({
    id: 'insight-3',
    title: 'Savings Rate',
    description: `Your overall savings rate is ${savingsRate}% — you saved ${formatCurrency(savings)} of ${formatCurrency(totalIncome)} total income.`,
    value: `${savingsRate}%`,
    icon: 'Wallet',
    trend: savingsRate >= 20 ? 'up' : 'neutral',
    trendValue: savingsRate >= 20 ? 'On track' : 'Needs attention',
  });

  // Insight 4: Largest Single Transaction
  const expenseTransactions = transactions.filter((t) => t.type === 'expense');
  if (expenseTransactions.length > 0) {
    const largest = expenseTransactions.reduce((max, t) => (t.amount > max.amount ? t : max), expenseTransactions[0]);
    insights.push({
      id: 'insight-4',
      title: 'Largest Expense',
      description: `Your largest single expense was ${formatCurrency(largest.amount)} for ${largest.category} on ${formatDate(largest.date)}.`,
      value: formatCurrency(largest.amount),
      icon: 'ArrowUpRight',
      trend: 'neutral',
    });
  }

  return insights;
}

export function applyFilters(transactions: Transaction[], filters: TransactionFilters): Transaction[] {
  let result = [...transactions];

  // Search filter (matches description, merchant, category)
  if (filters.search.trim()) {
    const searchLower = filters.search.toLowerCase().trim();
    result = result.filter(
      (t) =>
        t.description.toLowerCase().includes(searchLower) ||
        t.merchant.toLowerCase().includes(searchLower) ||
        t.category.toLowerCase().includes(searchLower)
    );
  }

  // Type filter
  if (filters.type !== 'all') {
    result = result.filter((t) => t.type === filters.type);
  }

  // Category filter
  if (filters.category !== 'all') {
    result = result.filter((t) => t.category === filters.category);
  }

  // Date range filter
  if (filters.dateRange) {
    result = result.filter((t) => t.date >= filters.dateRange!.start && t.date <= filters.dateRange!.end);
  }

  // Sorting
  result.sort((a, b) => {
    let comparison = 0;
    switch (filters.sortBy) {
      case 'date':
        comparison = a.date.localeCompare(b.date);
        break;
      case 'amount':
        comparison = a.amount - b.amount;
        break;
      case 'category':
        comparison = a.category.localeCompare(b.category);
        break;
    }
    return filters.sortOrder === 'desc' ? -comparison : comparison;
  });

  return result;
}
