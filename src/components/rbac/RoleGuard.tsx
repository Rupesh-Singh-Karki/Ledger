import { useRole } from '@/hooks/useRole';

interface RoleGuardProps {
  action: 'add' | 'edit' | 'delete';
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleGuard({ action, children, fallback }: RoleGuardProps) {
  const { canAdd, canEdit, canDelete } = useRole();

  const permitted =
    (action === 'add' && canAdd) ||
    (action === 'edit' && canEdit) ||
    (action === 'delete' && canDelete);

  if (permitted) {
    return <>{children}</>;
  }

  return fallback ? <>{fallback}</> : null;
}
