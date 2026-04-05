import { useStore } from '@/store';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import { Skeleton } from '@/components/ui/skeleton';

interface RecentTransactionsProps {
  isLoading: boolean;
}

export function RecentTransactions({ isLoading }: RecentTransactionsProps) {
  const transactions = useStore((s) => s.transactions);

  const recent = [...transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-card/80 to-card/30 backdrop-blur-xl border border-border/50 rounded-3xl p-6 shadow-sm transition-all duration-300 hover:shadow-md relative overflow-hidden group">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-income/5 rounded-full blur-3xl group-hover:bg-income/10 transition-colors duration-500 pointer-events-none" />
        <div className="relative z-10 flex items-center justify-between mb-4">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-12 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-card/80 to-card/30 backdrop-blur-xl border border-border/50 rounded-3xl p-6 shadow-sm transition-all duration-300 hover:shadow-md relative overflow-hidden group">
      <div className="absolute top-0 left-0 -ml-16 -mt-16 w-48 h-48 bg-income/5 rounded-full blur-3xl group-hover:bg-income/10 transition-colors duration-500 pointer-events-none" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-medium text-foreground">Recent Transactions</h3>
          <Link
            to="/transactions"
            className="flex items-center gap-1 text-xs text-income hover:text-income/80 transition-colors relative z-20"
          >
            View All <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="space-y-1">
        {recent.map((txn) => (
          <div
            key={txn.id}
            className="flex items-center justify-between py-3 px-2 rounded-xl hover:bg-card-hover transition-colors duration-150"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{txn.description}</p>
              <p className="text-xs text-muted-foreground">{formatDate(txn.date)}</p>
            </div>
            <div className="text-right ml-4">
              <p className={`text-sm font-medium ${txn.type === 'income' ? 'text-income' : 'text-negative'}`}>
                {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount)}
              </p>
              <span className="text-xs text-muted-foreground">{txn.category}</span>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
