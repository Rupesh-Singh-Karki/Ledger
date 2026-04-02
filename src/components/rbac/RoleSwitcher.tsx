import { useRole } from '@/hooks/useRole';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Shield, Eye, ChevronDown } from 'lucide-react';
import type { Role } from '@/types';

export function RoleSwitcher() {
  const { role, setRole } = useRole();

  const handleRoleChange = (newRole: Role) => {
    if (newRole !== role) {
      setRole(newRole);
      toast.success(
        `Switched to ${newRole === 'admin' ? 'Admin' : 'Viewer'} mode`
      );
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-full gap-2 px-3 h-9 text-sm"
          id="role-switcher"
        >
          {role === 'admin' ? (
            <Shield className="h-4 w-4 text-income" />
          ) : (
            <Eye className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="hidden sm:inline capitalize">{role}</span>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-xl w-40">
        <DropdownMenuItem
          onClick={() => handleRoleChange('admin')}
          className="gap-2 rounded-lg cursor-pointer"
        >
          <Shield className="h-4 w-4 text-income" />
          <span>Admin</span>
          {role === 'admin' && (
            <span className="ml-auto h-2 w-2 rounded-full bg-income" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleRoleChange('viewer')}
          className="gap-2 rounded-lg cursor-pointer"
        >
          <Eye className="h-4 w-4 text-muted-foreground" />
          <span>Viewer</span>
          {role === 'viewer' && (
            <span className="ml-auto h-2 w-2 rounded-full bg-muted-foreground" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
