import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'completed' | 'pending';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
        status === 'completed'
          ? 'bg-income/15 text-income'
          : 'bg-muted-foreground/15 text-muted-foreground'
      )}
    >
      {status === 'completed' ? 'Completed' : 'Pending'}
    </span>
  );
}
