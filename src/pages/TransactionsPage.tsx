import { useState } from 'react';
import { useTransactions } from '@/hooks/useTransactions';
import { useRole } from '@/hooks/useRole';
import { FilterBar } from '@/components/transactions/FilterBar';
import { TransactionList } from '@/components/transactions/TransactionList';
import { TransactionForm } from '@/components/transactions/TransactionForm';
import { EmptyState } from '@/components/ui/EmptyState';
import { PermissionTooltip } from '@/components/rbac/PermissionTooltip';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Plus, Download, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { exportToCSV } from '@/utils/export';
import { addTransaction, editTransaction, deleteTransaction } from '@/api/transactions';
import { useStore } from '@/store';
import type { Transaction, TransactionFormData } from '@/types';

export default function TransactionsPage() {
  const { transactions, isLoading, totalCount, filteredCount, refetch } = useTransactions();
  const { canAdd } = useRole();
  const resetFilters = useStore((s) => s.resetFilters);

  const [formOpen, setFormOpen] = useState(false);
  const [editingTxn, setEditingTxn] = useState<Transaction | null>(null);
  const [deletingTxn, setDeletingTxn] = useState<Transaction | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleAdd = async (data: TransactionFormData) => {
    await addTransaction(data);
    toast.success('Transaction added successfully');
    refetch();
  };

  const handleEdit = async (data: TransactionFormData) => {
    if (!editingTxn) return;
    await editTransaction(editingTxn.id, data);
    toast.success('Transaction updated successfully');
    setEditingTxn(null);
    refetch();
  };

  const handleDelete = async () => {
    if (!deletingTxn) return;
    setDeleteLoading(true);
    try {
      await deleteTransaction(deletingTxn.id);
      toast.success('Transaction deleted');
      setDeletingTxn(null);
      refetch();
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleExport = () => {
    exportToCSV(transactions);
    toast.success('Transactions exported as CSV');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Transactions</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage your income and expenses</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="rounded-full gap-2 text-sm"
            onClick={handleExport}
            id="export-csv"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>

          {canAdd ? (
            <Button
              className="rounded-full gap-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setFormOpen(true)}
              id="add-transaction"
            >
              <Plus className="h-4 w-4" />
              Add New
            </Button>
          ) : (
            <PermissionTooltip message="Switch to Admin to add transactions">
              <Button
                className="rounded-full gap-2 text-sm opacity-50 cursor-not-allowed"
                disabled
                id="add-transaction-disabled"
              >
                <Plus className="h-4 w-4" />
                Add New
              </Button>
            </PermissionTooltip>
          )}
        </div>
      </div>

      <FilterBar />

      {/* Count */}
      {!isLoading && (
        <p className="text-sm text-muted-foreground">
          Showing {filteredCount} of {totalCount} transactions
        </p>
      )}

      {/* Transaction list or empty state */}
      {!isLoading && transactions.length === 0 ? (
        <EmptyState
          title="No transactions found"
          description="Try adjusting your search or filters"
          action={{ label: 'Reset Filters', onClick: resetFilters }}
        />
      ) : (
        <TransactionList
          transactions={transactions}
          isLoading={isLoading}
          onEdit={(txn) => setEditingTxn(txn)}
          onDelete={(txn) => setDeletingTxn(txn)}
        />
      )}

      {/* Add Form Dialog */}
      <TransactionForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleAdd}
      />

      {/* Edit Form Dialog */}
      {editingTxn && (
        <TransactionForm
          open={!!editingTxn}
          onClose={() => setEditingTxn(null)}
          onSubmit={handleEdit}
          initialData={editingTxn}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deletingTxn} onOpenChange={(val) => !val && setDeletingTxn(null)}>
        <DialogContent className="rounded-3xl bg-card border-border max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Delete Transaction
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Delete this transaction? This action cannot be undone.
          </p>
          <DialogFooter className="gap-2">
            <Button variant="ghost" className="rounded-full" onClick={() => setDeletingTxn(null)}>
              Cancel
            </Button>
            <Button
              className="rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDelete}
              disabled={deleteLoading}
            >
              {deleteLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
