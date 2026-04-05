import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, Lightbulb, Settings, Zap, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navLinks = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { to: '/insights', label: 'Insights', icon: Lightbulb },
];

interface SidebarProps {
  onLinkClick?: () => void;
}

export function Sidebar({ onLinkClick }: SidebarProps) {
  return (
    <nav className="flex flex-col h-full px-4 py-6" role="navigation" aria-label="Main navigation">
      <div className="flex flex-col gap-1 flex-1">
        <div className="px-4 pb-2 pt-2">
          <p className="text-[10px] font-bold text-muted-foreground/70 tracking-widest uppercase">Overview</p>
        </div>
        {navLinks.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onLinkClick}
            className={({ isActive }) =>
              cn(
                'group flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300',
                isActive
                  ? 'text-income bg-gradient-to-r from-income/15 to-transparent border-l-[3px] border-income shadow-sm'
                  : 'text-muted-foreground hover:bg-card-hover hover:text-foreground hover:translate-x-1'
              )
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3">
                  <Icon className={cn("h-5 w-5 transition-transform duration-300 group-hover:scale-110", isActive && "drop-shadow-[0_0_8px_rgba(45,212,191,0.6)]")} />
                  <span>{label}</span>
                </div>
                <ChevronRight className={cn(
                  "h-4 w-4 transition-all duration-300",
                  isActive ? "opacity-100 translate-x-0 text-income/70" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                )} />
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Pro Banner */}
      <div className="mt-auto mb-6 rounded-2xl bg-gradient-to-br from-card/50 to-card border border-border/50 p-4 relative overflow-hidden group shadow-sm transition-all hover:shadow-md">
        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-28 h-28 bg-income/10 rounded-full blur-2xl group-hover:bg-income/20 transition-colors duration-500" />
        <div className="relative z-10">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-income to-income/70 flex items-center justify-center mb-3 shadow-[0_4px_10px_rgba(45,212,191,0.2)] group-hover:shadow-[0_4px_15px_rgba(45,212,191,0.4)] transition-shadow duration-300">
            <Zap className="h-4 w-4 text-primary-foreground fill-primary-foreground" />
          </div>
          <h4 className="text-sm font-semibold text-foreground mb-1 tracking-tight">Ledger Pro</h4>
          <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
            Unlock advanced analytics & AI-driven insights.
          </p>
          <Button variant="default" size="sm" className="w-full bg-income hover:bg-income/90 text-primary-foreground text-xs font-semibold h-9 rounded-lg shadow-md transition-all duration-300 hover:shadow-[0_4px_12px_rgba(45,212,191,0.3)] hover:-translate-y-0.5">
            Upgrade Now
          </Button>
        </div>
      </div>

      {/* Settings at bottom */}
      <div className="border-t border-border/50 pt-4 mt-2">
        <div className="px-4 pb-2">
          <p className="text-[10px] font-bold text-muted-foreground/70 tracking-widest uppercase">Preferences</p>
        </div>
        <NavLink
          to="/settings"
          onClick={onLinkClick}
          className={({ isActive }) =>
            cn(
              'group flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300',
              isActive
                ? 'text-foreground bg-secondary/50 border-l-[3px] border-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-card-hover hover:text-foreground hover:translate-x-1'
            )
          }
        >
          <div className="flex items-center gap-3">
             <Settings className="h-5 w-5 transition-transform duration-500 group-hover:rotate-90 group-hover:text-foreground" />
             <span>Settings</span>
          </div>
        </NavLink>
      </div>
    </nav>
  );
}
