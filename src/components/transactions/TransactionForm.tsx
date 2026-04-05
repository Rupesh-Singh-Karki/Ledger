import { useState } from 'react';
import type { Transaction, TransactionFormData } from '@/types';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@/data/categories';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DatePicker } from '@/components/ui/DatePicker';

interface TransactionFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: TransactionFormData) => Promise<void>;
  initialData?: Transaction | null;
}

export function TransactionForm({ open, onClose, onSubmit, initialData }: TransactionFormProps) {
  const isEdit = !!initialData;

  const [formData, setFormData] = useState<TransactionFormData>({
    date: initialData?.date || new Date().toISOString().split('T')[0],
    description: initialData?.description || '',
    merchant: initialData?.merchant || '',
    amount: initialData?.amount || 0,
    type: initialData?.type || 'expense',
    category: initialData?.category || '',
    status: initialData?.status || 'completed',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = formData.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.merchant || formData.amount <= 0 || !formData.category) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset category when type changes  
  const handleTypeChange = (type: 'income' | 'expense') => {
    setFormData((prev) => ({ ...prev, type, category: '' }));
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="rounded-2xl sm:rounded-3xl bg-card border-border max-w-md w-[calc(100%-2rem)] sm:w-full max-h-[90dvh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-5 pt-5 pb-3 sm:px-6 sm:pt-6 shrink-0">
          <DialogTitle className="text-lg font-semibold text-foreground">
            {isEdit ? 'Edit Transaction' : 'Add Transaction'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-5 sm:px-6 space-y-4 pb-2">
            <div className="space-y-2">
              <Label htmlFor="txn-date" className="text-sm text-muted-foreground">Date *</Label>
              <DatePicker
                id="txn-date"
                value={formData.date}
                onChange={(date) => setFormData((prev) => ({ ...prev, date }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="txn-description" className="text-sm text-muted-foreground">Description *</Label>
              <Input
                id="txn-description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                className="rounded-full bg-input border-border h-10"
                placeholder="e.g., Monthly rent payment"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="txn-merchant" className="text-sm text-muted-foreground">Merchant *</Label>
              <Input
                id="txn-merchant"
                value={formData.merchant}
                onChange={(e) => setFormData((prev) => ({ ...prev, merchant: e.target.value }))}
                className="rounded-full bg-input border-border h-10"
                placeholder="e.g., Whole Foods"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-2 min-w-0">
                <Label htmlFor="txn-amount" className="text-sm text-muted-foreground">Amount *</Label>
                <Input
                  id="txn-amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={formData.amount || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                  className="rounded-full bg-input border-border h-10 w-full"
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="space-y-2 min-w-0">
                <Label className="text-sm text-muted-foreground">Type *</Label>
                <Select value={formData.type} onValueChange={(v: 'income' | 'expense') => handleTypeChange(v)}>
                  <SelectTrigger className="rounded-full bg-input border-border h-10 w-full" id="txn-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="income" className="rounded-lg">Income</SelectItem>
                    <SelectItem value="expense" className="rounded-lg">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-2 min-w-0">
                <Label className="text-sm text-muted-foreground">Category *</Label>
                <Select value={formData.category} onValueChange={(v: string) => setFormData((prev) => ({ ...prev, category: v }))}>
                  <SelectTrigger className="rounded-full bg-input border-border h-10 w-full" id="txn-category">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {categories.map((cat) => (
                      <SelectItem key={cat.name} value={cat.name} className="rounded-lg">
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 min-w-0">
                <Label className="text-sm text-muted-foreground">Status</Label>
                <Select value={formData.status} onValueChange={(v: 'completed' | 'pending') => setFormData((prev) => ({ ...prev, status: v }))}>
                  <SelectTrigger className="rounded-full bg-input border-border h-10 w-full" id="txn-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="completed" className="rounded-lg">Completed</SelectItem>
                    <SelectItem value="pending" className="rounded-lg">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 px-5 py-4 sm:px-6 border-t border-border/50 shrink-0">
            <Button type="button" variant="ghost" className="rounded-full" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isSubmitting || !formData.description || !formData.merchant || formData.amount <= 0 || !formData.category}
            >
              {isSubmitting ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Transaction'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
