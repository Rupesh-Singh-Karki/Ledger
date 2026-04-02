import type { Transaction } from '@/types';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { RoleGuard } from '@/components/rbac/RoleGuard';
import { PermissionTooltip } from '@/components/rbac/PermissionTooltip';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

interface TransactionCardProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

export function TransactionCard({ transaction, onEdit, onDelete }: TransactionCardProps) {
  return (
    <div className="bg-card rounded-3xl p-4 shadow-[var(--shadow)] hover:bg-card-hover transition-colors duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{transaction.description}</p>
          <p className="text-xs text-muted-foreground">{transaction.merchant}</p>
        </div>
        <span className="text-xs text-muted-foreground ml-3">{formatDate(transaction.date)}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              transaction.type === 'income'
                ? 'bg-income/15 text-income'
                : 'bg-expense/15 text-expense'
            }`}
          >
            {transaction.type === 'income' ? 'Income' : 'Expense'}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-foreground">
            {transaction.category}
          </span>
          <StatusBadge status={transaction.status} />
        </div>
        <p className={`text-base font-semibold ${
          transaction.type === 'income' ? 'text-income' : 'text-expense'
        }`}>
          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
        </p>
      </div>

      <div className="flex items-center gap-1 mt-3 pt-3 border-t border-border">
        <RoleGuard
          action="edit"
          fallback={<PermissionTooltip message="Admin only" />}
        >
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full gap-1 text-xs h-7"
            onClick={() => onEdit(transaction)}
          >
            <Pencil className="h-3 w-3" /> Edit
          </Button>
        </RoleGuard>
        <RoleGuard
          action="delete"
          fallback={<PermissionTooltip message="Admin only" />}
        >
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full gap-1 text-xs h-7 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => onDelete(transaction)}
          >
            <Trash2 className="h-3 w-3" /> Delete
          </Button>
        </RoleGuard>
      </div>
    </div>
  );
}
