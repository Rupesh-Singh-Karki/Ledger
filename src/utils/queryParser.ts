import type { Transaction } from '@/types';
import { formatCurrency } from '@/utils/formatCurrency';
import { format, parseISO } from 'date-fns';

export interface QueryResult {
  answer: string;
  value?: string;
  confidence: 'high' | 'low';
  relatedCategory?: string;
  relatedMonth?: string;
}

// Month mapping
const MONTH_NAMES: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
  jan: 0, feb: 1, mar: 2, apr: 3, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

// Category aliases for fuzzy matching
const CATEGORY_ALIASES: Record<string, string[]> = {
  'Housing': ['housing', 'rent', 'mortgage', 'home'],
  'Groceries': ['groceries', 'grocery', 'food', 'supermarket'],
  'Dining': ['dining', 'restaurant', 'eating out', 'food', 'meals'],
  'Transportation': ['transportation', 'transport', 'travel', 'commute', 'uber', 'gas', 'fuel'],
  'Entertainment': ['entertainment', 'fun', 'movies', 'games', 'concert'],
  'Shopping': ['shopping', 'clothes', 'amazon', 'online shopping'],
  'Utilities': ['utilities', 'bills', 'electric', 'water', 'power'],
  'Healthcare': ['healthcare', 'health', 'medical', 'doctor', 'hospital'],
  'Subscriptions': ['subscriptions', 'subscription', 'netflix', 'spotify', 'gym'],
  'Education': ['education', 'school', 'courses', 'learning', 'tuition'],
};

function normalize(query: string): string {
  return query.toLowerCase().trim().replace(/[?!.,;:'"]/g, '');
}

function findCategory(query: string): string | string[] | null {
  const q = normalize(query);
  const matches: string[] = [];

  for (const [category, aliases] of Object.entries(CATEGORY_ALIASES)) {
    for (const alias of aliases) {
      if (q.includes(alias)) {
        if (!matches.includes(category)) {
          matches.push(category);
        }
        break;
      }
    }
  }

  // "food" matches both Groceries and Dining
  if (matches.length > 1) return matches;
  if (matches.length === 1) return matches[0];
  return null;
}

function findMonth(query: string): { month: number; year: number } | null {
  const q = normalize(query);

  // Relative months
  if (q.includes('last month')) return { month: 10, year: 2024 }; // November 2024
  if (q.includes('this month')) return { month: 11, year: 2024 }; // December 2024

  // Named months
  for (const [name, monthIndex] of Object.entries(MONTH_NAMES)) {
    if (q.includes(name)) {
      // Try to find year
      const yearMatch = q.match(/\b(202[0-9])\b/);
      const year = yearMatch ? parseInt(yearMatch[1]) : 2024;
      return { month: monthIndex, year };
    }
  }

  return null;
}

function findTwoMonths(query: string): [{ month: number; year: number }, { month: number; year: number }] | null {
  const q = normalize(query);
  const found: { month: number; year: number; pos: number }[] = [];

  for (const [name, monthIndex] of Object.entries(MONTH_NAMES)) {
    const idx = q.indexOf(name);
    if (idx !== -1 && !found.some(f => f.month === monthIndex)) {
      found.push({ month: monthIndex, year: 2024, pos: idx });
    }
  }

  if (found.length >= 2) {
    found.sort((a, b) => a.pos - b.pos);
    return [found[0], found[1]];
  }
  return null;
}

function filterByMonth(transactions: Transaction[], month: number, year: number): Transaction[] {
  return transactions.filter((t) => {
    const d = parseISO(t.date);
    return d.getMonth() === month && d.getFullYear() === year;
  });
}

function getMonthLabel(month: number, year: number): string {
  const date = new Date(year, month, 1);
  return format(date, 'MMMM yyyy');
}

function sumByType(transactions: Transaction[], type: 'income' | 'expense'): number {
  return transactions.filter((t) => t.type === type).reduce((s, t) => s + t.amount, 0);
}

// ==================== PATTERN MATCHERS ====================

function matchCategoryWithMonth(query: string, transactions: Transaction[]): QueryResult | null {
  const q = normalize(query);
  const category = findCategory(q);
  const month = findMonth(q);

  if (!category || !month) return null;
  if (Array.isArray(category)) return null; // Ambiguous

  const monthTxns = filterByMonth(transactions, month.month, month.year);
  const catTxns = monthTxns.filter((t) => t.type === 'expense' && t.category === category);
  const total = catTxns.reduce((s, t) => s + t.amount, 0);
  const label = getMonthLabel(month.month, month.year);

  if (catTxns.length === 0) {
    return {
      answer: `You have no recorded expenses in ${category} for ${label}.`,
      confidence: 'high',
      relatedCategory: category,
      relatedMonth: label,
    };
  }

  return {
    answer: `You spent ${formatCurrency(total)} on ${category} in ${label}.`,
    value: formatCurrency(total),
    confidence: 'high',
    relatedCategory: category,
    relatedMonth: label,
  };
}

function matchCategorySpending(query: string, transactions: Transaction[]): QueryResult | null {
  const q = normalize(query);
  if (!q.match(/how much|spent on|spend on|spending on|expenses? (on|for|in)/)) return null;

  const category = findCategory(q);
  if (!category) return null;

  if (Array.isArray(category)) {
    // Multiple categories matched (e.g. "food")
    const combined = transactions
      .filter((t) => t.type === 'expense' && category.includes(t.category))
      .reduce((s, t) => s + t.amount, 0);
    const totalExpenses = sumByType(transactions, 'expense');
    const pct = totalExpenses > 0 ? ((combined / totalExpenses) * 100).toFixed(1) : '0';

    return {
      answer: `You spent ${formatCurrency(combined)} on ${category.join(' & ')} combined across all months. That's ${pct}% of your total expenses.`,
      value: formatCurrency(combined),
      confidence: 'high',
    };
  }

  const catTxns = transactions.filter((t) => t.type === 'expense' && t.category === category);
  const total = catTxns.reduce((s, t) => s + t.amount, 0);
  const totalExpenses = sumByType(transactions, 'expense');
  const pct = totalExpenses > 0 ? ((total / totalExpenses) * 100).toFixed(1) : '0';

  if (catTxns.length === 0) {
    return {
      answer: `You have no recorded expenses in the ${category} category.`,
      confidence: 'high',
      relatedCategory: category,
    };
  }

  return {
    answer: `You spent ${formatCurrency(total)} on ${category} across all months. That's ${pct}% of your total expenses.`,
    value: formatCurrency(total),
    confidence: 'high',
    relatedCategory: category,
  };
}

function matchSavingsRate(query: string, transactions: Transaction[]): QueryResult | null {
  const q = normalize(query);
  if (!q.match(/savings? rate|how much did i save|saving|saved/)) return null;

  const totalIncome = sumByType(transactions, 'income');
  const totalExpenses = sumByType(transactions, 'expense');
  const savings = totalIncome - totalExpenses;
  const rate = totalIncome > 0 ? ((savings / totalIncome) * 100).toFixed(1) : '0';

  return {
    answer: `Your overall savings rate is ${rate}%. You saved ${formatCurrency(savings)} out of ${formatCurrency(totalIncome)} total income.`,
    value: `${rate}%`,
    confidence: 'high',
  };
}

function matchBiggestExpense(query: string, transactions: Transaction[]): QueryResult | null {
  const q = normalize(query);
  if (!q.match(/biggest expense|largest expense|highest expense|most expensive/)) return null;

  const expenses = transactions.filter((t) => t.type === 'expense');
  if (expenses.length === 0) {
    return { answer: 'No expenses found in your records.', confidence: 'high' };
  }

  const largest = expenses.reduce((max, t) => (t.amount > max.amount ? t : max), expenses[0]);

  return {
    answer: `Your largest single expense was ${formatCurrency(largest.amount)} — '${largest.description}' in the ${largest.category} category on ${format(parseISO(largest.date), 'MMM dd, yyyy')}.`,
    value: formatCurrency(largest.amount),
    confidence: 'high',
    relatedCategory: largest.category,
  };
}

function matchTopCategory(query: string, transactions: Transaction[]): QueryResult | null {
  const q = normalize(query);
  if (!q.match(/top category|highest category|most spending|where do i spend|where am i spending/)) return null;

  const expenses = transactions.filter((t) => t.type === 'expense');
  const categoryMap = new Map<string, number>();
  expenses.forEach((t) => {
    categoryMap.set(t.category, (categoryMap.get(t.category) || 0) + t.amount);
  });

  if (categoryMap.size === 0) {
    return { answer: 'No expenses found to analyze.', confidence: 'high' };
  }

  const sorted = Array.from(categoryMap.entries()).sort((a, b) => b[1] - a[1]);
  const [topCat, topAmount] = sorted[0];
  const totalExpenses = sumByType(transactions, 'expense');
  const pct = totalExpenses > 0 ? ((topAmount / totalExpenses) * 100).toFixed(1) : '0';

  return {
    answer: `Your highest spending category is ${topCat} at ${formatCurrency(topAmount)}, which is ${pct}% of your total expenses.`,
    value: formatCurrency(topAmount),
    confidence: 'high',
    relatedCategory: topCat,
  };
}

function matchMonthComparison(query: string, transactions: Transaction[]): QueryResult | null {
  const q = normalize(query);
  if (!q.match(/compare|vs|versus|difference between/)) return null;

  const twoMonths = findTwoMonths(q);
  if (!twoMonths) return null;

  const [m1, m2] = twoMonths;
  const m1Txns = filterByMonth(transactions, m1.month, m1.year);
  const m2Txns = filterByMonth(transactions, m2.month, m2.year);

  const m1Expenses = sumByType(m1Txns, 'expense');
  const m2Expenses = sumByType(m2Txns, 'expense');

  const label1 = getMonthLabel(m1.month, m1.year);
  const label2 = getMonthLabel(m2.month, m2.year);

  const diff = m1Expenses - m2Expenses;
  const pctChange = m2Expenses > 0 ? ((diff / m2Expenses) * 100).toFixed(0) : '0';
  const direction = diff > 0 ? 'increase' : diff < 0 ? 'decrease' : 'no change';

  return {
    answer: `In ${label1} you spent ${formatCurrency(m1Expenses)} vs ${formatCurrency(m2Expenses)} in ${label2} — a ${Math.abs(parseInt(pctChange))}% ${direction}.`,
    value: `${diff >= 0 ? '+' : ''}${formatCurrency(diff)}`,
    confidence: 'high',
    relatedMonth: label1,
  };
}

function matchMonthlyTotal(query: string, transactions: Transaction[]): QueryResult | null {
  const month = findMonth(query);
  if (!month) return null;

  const q = normalize(query);
  // Only trigger if query seems to be asking about a month
  if (!q.match(/how much|spending|expenses?|income|total|in\s/)) {
    // If it's just a month name, still handle it
    const monthNames = Object.keys(MONTH_NAMES);
    const hasMonthOnly = monthNames.some(m => q.includes(m));
    if (!hasMonthOnly) return null;
  }

  const monthTxns = filterByMonth(transactions, month.month, month.year);
  const label = getMonthLabel(month.month, month.year);

  if (monthTxns.length === 0) {
    return {
      answer: `No transactions found for ${label} in your records.`,
      confidence: 'high',
      relatedMonth: label,
    };
  }

  const income = sumByType(monthTxns, 'income');
  const expenses = sumByType(monthTxns, 'expense');
  const net = income - expenses;
  const netLabel = net >= 0 ? `+${formatCurrency(net)}` : `-${formatCurrency(Math.abs(net))}`;

  return {
    answer: `In ${label}: Income ${formatCurrency(income)} · Expenses ${formatCurrency(expenses)} · Net ${netLabel}`,
    value: formatCurrency(net),
    confidence: 'high',
    relatedMonth: label,
  };
}

function matchIncome(query: string, transactions: Transaction[]): QueryResult | null {
  const q = normalize(query);
  if (!q.match(/income|how much did i earn|how much did i make|total income|earned/)) return null;

  // Check if a specific month is mentioned
  const month = findMonth(q);
  if (month) {
    const monthTxns = filterByMonth(transactions, month.month, month.year);
    const income = sumByType(monthTxns, 'income');
    const label = getMonthLabel(month.month, month.year);

    return {
      answer: `Your income in ${label} was ${formatCurrency(income)}.`,
      value: formatCurrency(income),
      confidence: 'high',
      relatedMonth: label,
    };
  }

  const totalIncome = sumByType(transactions, 'income');
  const incomeCats = new Map<string, number>();
  transactions.filter((t) => t.type === 'income').forEach((t) => {
    incomeCats.set(t.category, (incomeCats.get(t.category) || 0) + t.amount);
  });
  const primary = Array.from(incomeCats.entries()).sort((a, b) => b[1] - a[1])[0];

  return {
    answer: `Your total income across all months is ${formatCurrency(totalIncome)}.${primary ? ` Your primary income source is ${primary[0]}.` : ''}`,
    value: formatCurrency(totalIncome),
    confidence: 'high',
  };
}

function matchBalance(query: string, transactions: Transaction[]): QueryResult | null {
  const q = normalize(query);
  if (!q.match(/balance|net worth|how much do i have|overall$/)) return null;

  const totalIncome = sumByType(transactions, 'income');
  const totalExpenses = sumByType(transactions, 'expense');
  const balance = totalIncome - totalExpenses;

  return {
    answer: `Your current balance is ${formatCurrency(balance)} based on ${formatCurrency(totalIncome)} income and ${formatCurrency(totalExpenses)} in expenses.`,
    value: formatCurrency(balance),
    confidence: 'high',
  };
}

function matchTrend(query: string, transactions: Transaction[]): QueryResult | null {
  const q = normalize(query);
  if (!q.match(/trend|increasing|decreasing|going up|going down|pattern/)) return null;

  // Group by month
  const monthlyExpenses = new Map<string, number>();
  transactions.filter((t) => t.type === 'expense').forEach((t) => {
    const key = t.date.substring(0, 7); // "2024-08"
    monthlyExpenses.set(key, (monthlyExpenses.get(key) || 0) + t.amount);
  });

  const sorted = Array.from(monthlyExpenses.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  if (sorted.length < 3) {
    return { answer: 'Not enough data to determine a trend.', confidence: 'low' };
  }

  const firstHalf = sorted.slice(0, 2);
  const secondHalf = sorted.slice(-2);

  const avgFirst = firstHalf.reduce((s, [, v]) => s + v, 0) / firstHalf.length;
  const avgSecond = secondHalf.reduce((s, [, v]) => s + v, 0) / secondHalf.length;

  const direction = avgSecond > avgFirst ? 'trending upward' : avgSecond < avgFirst ? 'trending downward' : 'relatively stable';

  const firstLabels = firstHalf.map(([k]) => format(parseISO(`${k}-01`), 'MMM')).join('-');
  const secondLabels = secondHalf.map(([k]) => format(parseISO(`${k}-01`), 'MMM')).join('-');

  return {
    answer: `Your expenses have been ${direction} — average ${formatCurrency(avgFirst)}/month in ${firstLabels} vs ${formatCurrency(avgSecond)}/month in ${secondLabels}.`,
    value: direction === 'trending upward' ? '↑ Up' : direction === 'trending downward' ? '↓ Down' : '→ Stable',
    confidence: 'high',
  };
}

// ==================== MAIN PARSER ====================

export function parseQuery(query: string, transactions: Transaction[]): QueryResult {
  if (!query.trim()) {
    return {
      answer: 'Type a question to get started!',
      confidence: 'low',
    };
  }

  // Order matters — more specific patterns first
  const matchers = [
    matchCategoryWithMonth,
    matchCategorySpending,
    matchSavingsRate,
    matchBiggestExpense,
    matchTopCategory,
    matchMonthComparison,
    matchIncome,
    matchBalance,
    matchTrend,
    matchMonthlyTotal,
  ];

  for (const matcher of matchers) {
    const result = matcher(query, transactions);
    if (result) return result;
  }

  // Fallback
  return {
    answer: "I couldn't understand that query. Try asking about a specific category, month, or use one of the suggestions below.",
    confidence: 'low',
  };
}
