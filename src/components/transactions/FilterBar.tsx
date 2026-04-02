import { Search, X, RotateCcw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useStore } from '@/store';
import { ALL_CATEGORIES } from '@/data/categories';

export function FilterBar() {
  const filters = useStore((s) => s.filters);
  const updateFilters = useStore((s) => s.updateFilters);
  const resetFilters = useStore((s) => s.resetFilters);

  const hasActiveFilters =
    filters.search !== '' ||
    filters.type !== 'all' ||
    filters.category !== 'all' ||
    filters.sortBy !== 'date' ||
    filters.sortOrder !== 'desc';

  return (
    <div className="bg-card rounded-3xl p-4 shadow-[var(--shadow)] space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => updateFilters({ search: e.target.value })}
          className="pl-10 rounded-full bg-input border-border h-10"
          id="search-transactions"
        />
        {filters.search && (
          <button
            onClick={() => updateFilters({ search: '' })}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-3">
        <Select
          value={filters.type}
          onValueChange={(value: 'all' | 'income' | 'expense') => updateFilters({ type: value })}
        >
          <SelectTrigger className="w-[140px] rounded-full bg-input border-border h-9" id="filter-type">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all" className="rounded-lg">All Types</SelectItem>
            <SelectItem value="income" className="rounded-lg">Income</SelectItem>
            <SelectItem value="expense" className="rounded-lg">Expense</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.category}
          onValueChange={(value: string) => updateFilters({ category: value })}
        >
          <SelectTrigger className="w-[160px] rounded-full bg-input border-border h-9" id="filter-category">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="rounded-xl max-h-60">
            <SelectItem value="all" className="rounded-lg">All Categories</SelectItem>
            {ALL_CATEGORIES.map((cat) => (
              <SelectItem key={cat.name} value={cat.name} className="rounded-lg">
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={`${filters.sortBy}-${filters.sortOrder}`}
          onValueChange={(value: string) => {
            const [sortBy, sortOrder] = value.split('-') as ['date' | 'amount' | 'category', 'asc' | 'desc'];
            updateFilters({ sortBy, sortOrder });
          }}
        >
          <SelectTrigger className="w-[170px] rounded-full bg-input border-border h-9" id="filter-sort">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="date-desc" className="rounded-lg">Date (Newest)</SelectItem>
            <SelectItem value="date-asc" className="rounded-lg">Date (Oldest)</SelectItem>
            <SelectItem value="amount-desc" className="rounded-lg">Amount (High)</SelectItem>
            <SelectItem value="amount-asc" className="rounded-lg">Amount (Low)</SelectItem>
            <SelectItem value="category-asc" className="rounded-lg">Category (A-Z)</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full gap-1 text-xs text-muted-foreground hover:text-foreground"
            onClick={resetFilters}
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}
