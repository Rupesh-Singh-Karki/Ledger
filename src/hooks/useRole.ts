import { useStore } from '@/store';
import type { RolePermissions } from '@/types';

export function useRole(): RolePermissions {
  const role = useStore((s) => s.role);
  const setRole = useStore((s) => s.setRole);

  return {
    role,
    canAdd: role === 'admin',
    canEdit: role === 'admin',
    canDelete: role === 'admin',
    setRole,
  };
}
