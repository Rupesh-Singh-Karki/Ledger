import { Wallet, Sun, Moon, Search, Bell, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RoleSwitcher } from '@/components/rbac/RoleSwitcher';
import { MobileSidebar } from './MobileSidebar';
import { useTheme } from '@/hooks/useTheme';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-card/70 backdrop-blur-xl border-b border-border/50 shadow-sm flex items-center justify-between px-4 lg:px-6 transition-colors duration-200">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <MobileSidebar />
        <div className="flex items-center gap-2 group cursor-pointer lg:w-[216px]">
          <div className="h-9 w-9 rounded-xl bg-income/10 border border-income/20 flex items-center justify-center group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(45,212,191,0.2)] transition-all duration-300">
            <Wallet className="h-5 w-5 text-income group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 hidden sm:block">Ledger</h1>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 lg:gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center relative mr-2">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="h-9 w-64 rounded-full bg-secondary/50 border border-border/50 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-income/30 focus:border-income/50 transition-all placeholder:text-muted-foreground/70"
          />
        </div>

        <RoleSwitcher />

        <div className="flex items-center space-x-1 border-l border-border/50 pl-2 lg:pl-3 ml-1">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors hidden sm:inline-flex"
          >
            <Bell className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            id="theme-toggle"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 hover:rotate-45 transition-transform duration-300" />
            ) : (
              <Moon className="h-5 w-5 hover:-rotate-12 transition-transform duration-300" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-transparent ml-1"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-income to-expense p-[2px] transition-transform duration-300 hover:scale-105">
              <div className="h-full w-full rounded-full bg-card flex items-center justify-center">
                <UserCircle className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}
