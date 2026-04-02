// ===== TRANSACTION =====
export interface Transaction {
  id: string;
  date: string; // ISO 8601 format: "2024-11-01"
  amount: number; // Always positive
  type: 'income' | 'expense';
  category: string;
  description: string;
  merchant: string;
  status: 'completed' | 'pending';
}

export type TransactionFormData = Omit<Transaction, 'id'>;

// ===== FILTERS =====
export interface TransactionFilters {
  search: string;
  type: 'all' | 'income' | 'expense';
  category: string; // 'all' or specific category name
  dateRange: {
    start: string;
    end: string;
  } | null;
  sortBy: 'date' | 'amount' | 'category';
  sortOrder: 'asc' | 'desc';
}

// ===== DASHBOARD =====
export interface DashboardSummary {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  incomeChange: number; // Percentage change vs previous month
  expenseChange: number; // Percentage change vs previous month
  balanceChange: number; // Percentage change vs previous month
}

export interface MonthlyDataPoint {
  month: string; // "Nov 2024"
  income: number;
  expenses: number;
  balance: number;
}

export interface CategoryDataPoint {
  category: string;
  amount: number;
  percentage: number;
  color: string; // From CHART_COLORS
}

// ===== INSIGHTS =====
export interface Insight {
  id: string;
  title: string;
  description: string; // Human-readable sentence
  value: string; // Formatted display value
  icon: string; // Lucide icon name
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string; // e.g., "+12%"
}

// ===== RBAC =====
export type Role = 'viewer' | 'admin';

export interface RolePermissions {
  role: Role;
  canAdd: boolean;
  canEdit: boolean;
  canDelete: boolean;
  setRole: (role: Role) => void;
}

// ===== STORE =====
export interface TransactionSlice {
  transactions: Transaction[];
  addTransaction: (transaction: TransactionFormData) => void;
  editTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
}

export interface UISlice {
  role: Role;
  theme: 'light' | 'dark';
  filters: TransactionFilters;
  setRole: (role: Role) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  updateFilters: (filters: Partial<TransactionFilters>) => void;
  resetFilters: () => void;
}

export type AppStore = TransactionSlice & UISlice;

// ===== CATEGORY =====
export interface CategoryConfig {
  name: string;
  color: string; // From CHART_COLORS
  icon: string; // Lucide icon name
}

// ===== API =====
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}
