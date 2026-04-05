import type { Card } from '@/types';

export const mockCards: Card[] = [
  {
    id: 'card-001',
    cardNumber: '•••• •••• •••• 4242',
    cardHolder: 'ALEX MORGAN',
    expiryDate: '06/27',
    type: 'visa',
    variant: 'credit',
    balance: 2450.00,
    creditLimit: 10000.00,
    lastPayment: 500.00,
    lastPaymentDate: '2024-12-15',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #2dd4bf 100%)',
  },
  {
    id: 'card-002',
    cardNumber: '•••• •••• •••• 8891',
    cardHolder: 'ALEX MORGAN',
    expiryDate: '09/26',
    type: 'mastercard',
    variant: 'debit',
    balance: 7234.50,
    creditLimit: 0, // Debit card — no limit
    lastPayment: 0,
    lastPaymentDate: '',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  },
  {
    id: 'card-003',
    cardNumber: '•••• •••• •••• 5567',
    cardHolder: 'ALEX MORGAN',
    expiryDate: '12/28',
    type: 'visa',
    variant: 'credit',
    balance: 890.25,
    creditLimit: 5000.00,
    lastPayment: 250.00,
    lastPaymentDate: '2024-12-20',
    gradient: 'linear-gradient(135deg, #0d0d0d 0%, #434343 50%, #22d3ee 100%)',
  },
];
