import type { Transaction } from '@/types';
import { TransactionTable } from './TransactionTable';
import { TransactionCard } from './TransactionCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';

interface TransactionListProps {
  transactions: Transaction[];
  isLoading: boolean;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

export function TransactionList({ transactions, isLoading, onEdit, onDelete }: TransactionListProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (isMobile) {
    if (isLoading) {
      return (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 rounded-3xl" />
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {transactions.map((txn) => (
          <TransactionCard
            key={txn.id}
            transaction={txn}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
  }

  return (
    <TransactionTable
      transactions={transactions}
      isLoading={isLoading}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}
