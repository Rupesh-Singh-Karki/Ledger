import type { CategoryConfig } from '@/types';

export const CHART_COLORS = [
  '#2DD4BF', // teal-400
  '#0D9488', // teal-600
  '#22D3EE', // cyan-400
  '#06B6D4', // cyan-500
  '#38BDF8', // sky-400
  '#0EA5E9', // sky-500
  '#60A5FA', // blue-400
  '#3B82F6', // blue-500
  '#94A3B8', // slate-400
  '#64748B', // slate-500
];

export const EXPENSE_CATEGORIES: CategoryConfig[] = [
  { name: 'Housing', color: '#2DD4BF', icon: 'Home' },
  { name: 'Groceries', color: '#0D9488', icon: 'ShoppingCart' },
  { name: 'Dining', color: '#22D3EE', icon: 'Utensils' },
  { name: 'Transportation', color: '#06B6D4', icon: 'Car' },
  { name: 'Entertainment', color: '#38BDF8', icon: 'Film' },
  { name: 'Shopping', color: '#0EA5E9', icon: 'ShoppingBag' },
  { name: 'Utilities', color: '#60A5FA', icon: 'Zap' },
  { name: 'Healthcare', color: '#3B82F6', icon: 'Heart' },
  { name: 'Subscriptions', color: '#94A3B8', icon: 'CreditCard' },
  { name: 'Education', color: '#64748B', icon: 'BookOpen' },
];

export const INCOME_CATEGORIES: CategoryConfig[] = [
  { name: 'Salary', color: '#2DD4BF', icon: 'Briefcase' },
  { name: 'Freelance', color: '#14B8A6', icon: 'Laptop' },
  { name: 'Investments', color: '#22D3EE', icon: 'TrendingUp' },
  { name: 'Refunds', color: '#06B6D4', icon: 'RotateCcw' },
];

export const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];
