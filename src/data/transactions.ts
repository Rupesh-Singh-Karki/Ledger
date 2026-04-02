import type { Transaction } from '@/types';

export const mockTransactions: Transaction[] = [
  // ===== AUGUST 2024 =====
  { id: 'txn-001', date: '2024-08-01', amount: 4500.00, type: 'income', category: 'Salary', description: 'Monthly salary deposit', merchant: 'Acme Corp', status: 'completed' },
  { id: 'txn-002', date: '2024-08-02', amount: 1200.00, type: 'expense', category: 'Housing', description: 'Monthly rent payment', merchant: 'Greenview Apartments', status: 'completed' },
  { id: 'txn-003', date: '2024-08-05', amount: 15.99, type: 'expense', category: 'Subscriptions', description: 'Streaming subscription', merchant: 'Netflix', status: 'completed' },
  { id: 'txn-004', date: '2024-08-07', amount: 87.50, type: 'expense', category: 'Groceries', description: 'Weekly grocery run', merchant: 'Whole Foods', status: 'completed' },
  { id: 'txn-005', date: '2024-08-10', amount: 45.00, type: 'expense', category: 'Subscriptions', description: 'Monthly gym membership', merchant: 'WeWork Gym', status: 'completed' },
  { id: 'txn-006', date: '2024-08-12', amount: 32.50, type: 'expense', category: 'Dining', description: 'Dinner with friends', merchant: 'The Olive Garden', status: 'completed' },
  { id: 'txn-007', date: '2024-08-15', amount: 165.00, type: 'expense', category: 'Utilities', description: 'Electric and water bill', merchant: 'City Power Co.', status: 'completed' },
  { id: 'txn-008', date: '2024-08-18', amount: 95.20, type: 'expense', category: 'Groceries', description: 'Grocery shopping', merchant: 'Trader Joe\'s', status: 'completed' },
  { id: 'txn-009', date: '2024-08-23', amount: 55.00, type: 'expense', category: 'Dining', description: 'Friday night dinner', merchant: 'Chipotle', status: 'completed' },

  // ===== SEPTEMBER 2024 =====
  { id: 'txn-010', date: '2024-09-01', amount: 4500.00, type: 'income', category: 'Salary', description: 'Monthly salary deposit', merchant: 'Acme Corp', status: 'completed' },
  { id: 'txn-011', date: '2024-09-02', amount: 1200.00, type: 'expense', category: 'Housing', description: 'Monthly rent payment', merchant: 'Greenview Apartments', status: 'completed' },
  { id: 'txn-012', date: '2024-09-04', amount: 9.99, type: 'expense', category: 'Subscriptions', description: 'Music subscription', merchant: 'Spotify', status: 'completed' },
  { id: 'txn-013', date: '2024-09-06', amount: 72.30, type: 'expense', category: 'Groceries', description: 'Weekend grocery run', merchant: 'Whole Foods', status: 'completed' },
  { id: 'txn-014', date: '2024-09-09', amount: 28.00, type: 'expense', category: 'Transportation', description: 'Ride to downtown', merchant: 'Uber', status: 'completed' },
  { id: 'txn-015', date: '2024-09-13', amount: 175.00, type: 'expense', category: 'Utilities', description: 'Electric and gas bill', merchant: 'City Power Co.', status: 'completed' },
  { id: 'txn-016', date: '2024-09-15', amount: 15.99, type: 'expense', category: 'Subscriptions', description: 'Streaming subscription', merchant: 'Netflix', status: 'completed' },
  { id: 'txn-017', date: '2024-09-20', amount: 110.00, type: 'expense', category: 'Groceries', description: 'Bulk grocery shopping', merchant: 'Costco', status: 'completed' },
  { id: 'txn-018', date: '2024-09-22', amount: 42.00, type: 'expense', category: 'Dining', description: 'Brunch with family', merchant: 'IHOP', status: 'completed' },
  { id: 'txn-019', date: '2024-09-25', amount: 65.00, type: 'expense', category: 'Entertainment', description: 'Concert tickets', merchant: 'Ticketmaster', status: 'completed' },

  // ===== OCTOBER 2024 (Spending spike — travel) =====
  { id: 'txn-020', date: '2024-10-01', amount: 4500.00, type: 'income', category: 'Salary', description: 'Monthly salary deposit', merchant: 'Acme Corp', status: 'completed' },
  { id: 'txn-021', date: '2024-10-02', amount: 1200.00, type: 'expense', category: 'Housing', description: 'Monthly rent payment', merchant: 'Greenview Apartments', status: 'completed' },
  { id: 'txn-022', date: '2024-10-05', amount: 800.00, type: 'expense', category: 'Transportation', description: 'Flight to Chicago for conference', merchant: 'United Airlines', status: 'completed' },
  { id: 'txn-023', date: '2024-10-06', amount: 250.00, type: 'expense', category: 'Dining', description: 'Conference dinner event', merchant: 'Alinea Chicago', status: 'completed' },
  { id: 'txn-024', date: '2024-10-08', amount: 15.99, type: 'expense', category: 'Subscriptions', description: 'Streaming subscription', merchant: 'Netflix', status: 'completed' },
  { id: 'txn-025', date: '2024-10-10', amount: 45.00, type: 'expense', category: 'Subscriptions', description: 'Monthly gym membership', merchant: 'WeWork Gym', status: 'completed' },
  { id: 'txn-026', date: '2024-10-12', amount: 98.75, type: 'expense', category: 'Groceries', description: 'Weekly grocery shopping', merchant: 'Trader Joe\'s', status: 'completed' },
  { id: 'txn-027', date: '2024-10-15', amount: 190.00, type: 'expense', category: 'Utilities', description: 'Electric, water, and gas', merchant: 'City Power Co.', status: 'completed' },
  { id: 'txn-028', date: '2024-10-18', amount: 120.00, type: 'expense', category: 'Healthcare', description: 'Annual checkup copay', merchant: 'CityMed Clinic', status: 'completed' },
  { id: 'txn-029', date: '2024-10-22', amount: 35.00, type: 'expense', category: 'Dining', description: 'Quick lunch meeting', merchant: 'Panera Bread', status: 'completed' },
  { id: 'txn-030', date: '2024-10-28', amount: 2.99, type: 'expense', category: 'Subscriptions', description: 'Cloud storage plan', merchant: 'Google One', status: 'completed' },

  // ===== NOVEMBER 2024 (Income variation — freelance) =====
  { id: 'txn-031', date: '2024-11-01', amount: 4500.00, type: 'income', category: 'Salary', description: 'Monthly salary deposit', merchant: 'Acme Corp', status: 'completed' },
  { id: 'txn-032', date: '2024-11-02', amount: 1200.00, type: 'expense', category: 'Housing', description: 'Monthly rent payment', merchant: 'Greenview Apartments', status: 'completed' },
  { id: 'txn-033', date: '2024-11-05', amount: 1200.00, type: 'income', category: 'Freelance', description: 'Website redesign project', merchant: 'Freelance Client', status: 'completed' },
  { id: 'txn-034', date: '2024-11-07', amount: 68.40, type: 'expense', category: 'Groceries', description: 'Midweek grocery run', merchant: 'Whole Foods', status: 'completed' },
  { id: 'txn-035', date: '2024-11-10', amount: 9.99, type: 'expense', category: 'Subscriptions', description: 'Music subscription', merchant: 'Spotify', status: 'completed' },
  { id: 'txn-036', date: '2024-11-13', amount: 155.00, type: 'expense', category: 'Utilities', description: 'Electric and water bill', merchant: 'City Power Co.', status: 'completed' },
  { id: 'txn-037', date: '2024-11-15', amount: 15.99, type: 'expense', category: 'Subscriptions', description: 'Streaming subscription', merchant: 'Netflix', status: 'completed' },
  { id: 'txn-038', date: '2024-11-17', amount: 75.00, type: 'expense', category: 'Shopping', description: 'New running shoes', merchant: 'Nike Store', status: 'completed' },
  { id: 'txn-039', date: '2024-11-20', amount: 105.60, type: 'expense', category: 'Groceries', description: 'Thanksgiving groceries', merchant: 'Costco', status: 'completed' },
  { id: 'txn-040', date: '2024-11-23', amount: 48.00, type: 'expense', category: 'Dining', description: 'Saturday brunch', merchant: 'First Watch', status: 'completed' },
  { id: 'txn-041', date: '2024-11-28', amount: 45.00, type: 'expense', category: 'Subscriptions', description: 'Monthly gym membership', merchant: 'WeWork Gym', status: 'completed' },

  // ===== DECEMBER 2024 (Holiday spending + investment income) =====
  { id: 'txn-042', date: '2024-12-01', amount: 4500.00, type: 'income', category: 'Salary', description: 'Monthly salary deposit', merchant: 'Acme Corp', status: 'completed' },
  { id: 'txn-043', date: '2024-12-02', amount: 1200.00, type: 'expense', category: 'Housing', description: 'Monthly rent payment', merchant: 'Greenview Apartments', status: 'completed' },
  { id: 'txn-044', date: '2024-12-05', amount: 200.00, type: 'income', category: 'Investments', description: 'Quarterly dividend payment', merchant: 'Vanguard', status: 'completed' },
  { id: 'txn-045', date: '2024-12-07', amount: 350.00, type: 'expense', category: 'Shopping', description: 'Holiday gifts for family', merchant: 'Amazon', status: 'completed' },
  { id: 'txn-046', date: '2024-12-10', amount: 15.99, type: 'expense', category: 'Subscriptions', description: 'Streaming subscription', merchant: 'Netflix', status: 'completed' },
  { id: 'txn-047', date: '2024-12-12', amount: 88.90, type: 'expense', category: 'Groceries', description: 'Holiday baking supplies', merchant: 'Whole Foods', status: 'completed' },
  { id: 'txn-048', date: '2024-12-14', amount: 160.00, type: 'expense', category: 'Utilities', description: 'Winter electric bill', merchant: 'City Power Co.', status: 'completed' },
  { id: 'txn-049', date: '2024-12-18', amount: 62.00, type: 'expense', category: 'Dining', description: 'Holiday team dinner', merchant: 'Texas Roadhouse', status: 'completed' },
  { id: 'txn-050', date: '2024-12-22', amount: 95.00, type: 'expense', category: 'Groceries', description: 'Christmas dinner groceries', merchant: 'Trader Joe\'s', status: 'pending' },
  { id: 'txn-051', date: '2024-12-24', amount: 2.99, type: 'expense', category: 'Subscriptions', description: 'Cloud storage renewal', merchant: 'Google One', status: 'pending' },
  { id: 'txn-052', date: '2024-12-26', amount: 45.00, type: 'expense', category: 'Subscriptions', description: 'Monthly gym membership', merchant: 'WeWork Gym', status: 'pending' },
];
