import { Wallet, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RoleSwitcher } from '@/components/rbac/RoleSwitcher';
import { MobileSidebar } from './MobileSidebar';
import { useTheme } from '@/hooks/useTheme';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <MobileSidebar />
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-income/20 flex items-center justify-center">
            <Wallet className="h-4 w-4 text-income" />
          </div>
          <h1 className="text-xl font-bold text-foreground hidden sm:block">Ledger</h1>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <RoleSwitcher />
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          id="theme-toggle"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-muted-foreground" />
          ) : (
            <Moon className="h-5 w-5 text-muted-foreground" />
          )}
        </Button>
      </div>
    </header>
  );
}
