import { Skeleton } from '@/components/ui/skeleton';

export function PageLoader() {
  return (
    <div className="animate-fade-in p-6 space-y-6">
      {/* Summary cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-36 rounded-3xl" />
        ))}
      </div>
      {/* Charts skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Skeleton className="h-80 rounded-3xl" />
        <Skeleton className="h-80 rounded-3xl" />
      </div>
      {/* Recent transactions skeleton */}
      <Skeleton className="h-64 rounded-3xl" />
    </div>
  );
}
