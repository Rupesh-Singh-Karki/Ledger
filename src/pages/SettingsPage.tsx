import { useStore } from '@/store';
import { useTheme } from '@/hooks/useTheme';
import { useRole } from '@/hooks/useRole';
import { CURRENCY_LIST } from '@/data/currencies';
import { exportToCSV } from '@/utils/export';
import { toast } from 'sonner';
import {
  DollarSign,
  Shield,
  Eye,
  Palette,
  Sun,
  Moon,
  Database,
  Download,
  Trash2,
  Bell,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Role } from '@/types';
import { useState } from 'react';

function SettingSection({ title, description, icon: Icon, children }: {
  title: string;
  description: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card rounded-3xl p-6 shadow-[var(--shadow)]">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-income/15 flex items-center justify-center shrink-0">
          <Icon className="h-5 w-5 text-income" />
        </div>
        <div>
          <h3 className="text-base font-medium text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function ToggleSwitch({ checked, onChange, label, description }: {
  checked: boolean;
  onChange: (val: boolean) => void;
  label: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
          checked ? 'bg-primary' : 'bg-muted'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg transform transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { role, setRole } = useRole();
  const currency = useStore((s) => s.currency);
  const setCurrency = useStore((s) => s.setCurrency);
  const transactions = useStore((s) => s.transactions);

  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);
  const [monthlyDigest, setMonthlyDigest] = useState(true);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  const handleExport = () => {
    exportToCSV(transactions);
    toast.success('Data exported as CSV');
  };

  const handleClearData = () => {
    toast.info('This action is disabled in demo mode');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your preferences, currency, and account settings
        </p>
      </div>

      {/* Currency */}
      <SettingSection
        title="Currency"
        description="Choose your display currency — values are converted from USD"
        icon={DollarSign}
      >
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-input border border-border text-sm text-foreground hover:bg-card-hover transition-colors"
            id="currency-selector"
          >
            <span className="flex items-center gap-3">
              <span className="text-lg">
                {CURRENCY_LIST.find((c) => c.code === currency)?.symbol}
              </span>
              <span>
                {CURRENCY_LIST.find((c) => c.code === currency)?.name}{' '}
                <span className="text-muted-foreground">({currency})</span>
              </span>
            </span>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${showCurrencyDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showCurrencyDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden animate-fade-in">
              {CURRENCY_LIST.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-card-hover transition-colors ${
                    currency === c.code ? 'bg-income/10 text-income' : 'text-foreground'
                  }`}
                  onClick={() => {
                    setCurrency(c.code);
                    setShowCurrencyDropdown(false);
                    toast.success(`Currency changed to ${c.name}`);
                  }}
                >
                  <span className="text-lg w-6 text-center">{c.symbol}</span>
                  <span className="flex-1">{c.name}</span>
                  <span className="text-xs text-muted-foreground">{c.code}</span>
                  {c.code !== 'USD' && (
                    <span className="text-xs text-muted-foreground">1 USD = {c.rate} {c.code}</span>
                  )}
                  {currency === c.code && (
                    <span className="h-2 w-2 rounded-full bg-income" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </SettingSection>

      {/* Role Management */}
      <SettingSection
        title="Role Management"
        description="Switch between admin and viewer access levels"
        icon={Shield}
      >
        <div className="grid grid-cols-2 gap-3">
          {(['admin', 'viewer'] as Role[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => {
                setRole(r);
                toast.success(`Switched to ${r === 'admin' ? 'Admin' : 'Viewer'} mode`);
              }}
              className={`flex items-center gap-3 px-4 py-4 rounded-xl border transition-all duration-200 ${
                role === r
                  ? 'bg-income/10 border-income text-income'
                  : 'bg-input border-border text-foreground hover:bg-card-hover'
              }`}
              id={`role-${r}`}
            >
              {r === 'admin' ? (
                <Shield className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
              <div className="text-left">
                <p className="text-sm font-medium capitalize">{r}</p>
                <p className="text-xs text-muted-foreground">
                  {r === 'admin' ? 'Full access — add, edit, delete' : 'Read-only — view transactions'}
                </p>
              </div>
            </button>
          ))}
        </div>
      </SettingSection>

      {/* Appearance */}
      <SettingSection
        title="Appearance"
        description="Customize the look and feel of your dashboard"
        icon={Palette}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {theme === 'dark' ? (
              <Moon className="h-5 w-5 text-muted-foreground" />
            ) : (
              <Sun className="h-5 w-5 text-muted-foreground" />
            )}
            <div>
              <p className="text-sm font-medium text-foreground">
                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </p>
              <p className="text-xs text-muted-foreground">
                {theme === 'dark' ? 'Easy on the eyes in low-light environments' : 'Clean and bright for daytime use'}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="rounded-full px-4 text-sm"
            onClick={toggleTheme}
            id="settings-theme-toggle"
          >
            {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
          </Button>
        </div>
      </SettingSection>

      {/* Notifications */}
      <SettingSection
        title="Notifications"
        description="Manage your alert and report preferences"
        icon={Bell}
      >
        <div className="divide-y divide-border">
          <ToggleSwitch
            checked={budgetAlerts}
            onChange={setBudgetAlerts}
            label="Budget Alerts"
            description="Get notified when spending exceeds category limits"
          />
          <ToggleSwitch
            checked={weeklyReports}
            onChange={setWeeklyReports}
            label="Weekly Reports"
            description="Receive a weekly summary of your financial activity"
          />
          <ToggleSwitch
            checked={monthlyDigest}
            onChange={setMonthlyDigest}
            label="Monthly Digest"
            description="Monthly overview with insights and recommendations"
          />
        </div>
      </SettingSection>

      {/* Data Management */}
      <SettingSection
        title="Data Management"
        description="Export or manage your financial data"
        icon={Database}
      >
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="rounded-full gap-2 text-sm"
            onClick={handleExport}
            id="settings-export"
          >
            <Download className="h-4 w-4" />
            Export All Data
          </Button>
          <Button
            variant="outline"
            className="rounded-full gap-2 text-sm text-negative border-negative/30 hover:bg-negative/10 hover:text-negative"
            onClick={handleClearData}
            id="settings-clear-data"
          >
            <Trash2 className="h-4 w-4" />
            Clear All Data
          </Button>
        </div>
      </SettingSection>
    </div>
  );
}
