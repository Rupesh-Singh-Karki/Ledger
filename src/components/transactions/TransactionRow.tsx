import React from 'react';
import type { Transaction } from '@/types';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { RoleGuard } from '@/components/rbac/RoleGuard';
import { PermissionTooltip } from '@/components/rbac/PermissionTooltip';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

interface TransactionRowProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

export const TransactionRow = React.memo(function TransactionRow({
  transaction,
  onEdit,
  onDelete,
}: TransactionRowProps) {
  return (
    <tr className="hover:bg-card-hover transition-colors duration-150 border-b border-border">
      <td className="py-4 px-4 text-sm text-muted-foreground whitespace-nowrap">
        {formatDate(transaction.date)}
      </td>
      <td className="py-4 px-4">
        <p className="text-sm font-medium text-foreground">{transaction.description}</p>
        <p className="text-xs text-muted-foreground">{transaction.merchant}</p>
      </td>
      <td className="py-4 px-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-foreground">
          {transaction.category}
        </span>
      </td>
      <td className="py-4 px-4">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            transaction.type === 'income'
              ? 'bg-income/15 text-income'
              : 'bg-expense/15 text-expense'
          }`}
        >
          {transaction.type === 'income' ? 'Income' : 'Expense'}
        </span>
      </td>
      <td className={`py-4 px-4 text-sm font-medium whitespace-nowrap ${
        transaction.type === 'income' ? 'text-income' : 'text-expense'
      }`}>
        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
      </td>
      <td className="py-4 px-4">
        <StatusBadge status={transaction.status} />
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-1">
          <RoleGuard
            action="edit"
            fallback={<PermissionTooltip message="Admin only" />}
          >
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8"
              onClick={() => onEdit(transaction)}
              aria-label={`Edit ${transaction.description}`}
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
          </RoleGuard>
          <RoleGuard
            action="delete"
            fallback={<PermissionTooltip message="Admin only" />}
          >
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => onDelete(transaction)}
              aria-label={`Delete ${transaction.description}`}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </RoleGuard>
        </div>
      </td>
    </tr>
  );
});
