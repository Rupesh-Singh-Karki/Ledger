import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import App from './App'
import '@/styles/globals.css'

// Apply persisted theme immediately to avoid flash
const stored = localStorage.getItem('ledger-storage');
if (stored) {
  try {
    const parsed = JSON.parse(stored);
    const theme = parsed?.state?.theme;
    if (theme === 'light' || theme === 'dark') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  } catch {
    // ignore parse errors
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TooltipProvider delayDuration={200}>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: 'bg-card text-foreground border-border rounded-xl',
          style: {
            background: 'var(--card)',
            color: 'var(--foreground)',
            border: '1px solid var(--border)',
          },
        }}
        richColors={false}
      />
    </TooltipProvider>
  </StrictMode>,
)
