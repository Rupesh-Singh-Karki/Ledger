import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { PageLoader } from '@/components/ui/PageLoader';

const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const TransactionsPage = lazy(() => import('@/pages/TransactionsPage'));
const InsightsPage = lazy(() => import('@/pages/InsightsPage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route
            index
            element={
              <Suspense fallback={<PageLoader />}>
                <DashboardPage />
              </Suspense>
            }
          />
          <Route
            path="transactions"
            element={
              <Suspense fallback={<PageLoader />}>
                <TransactionsPage />
              </Suspense>
            }
          />
          <Route
            path="insights"
            element={
              <Suspense fallback={<PageLoader />}>
                <InsightsPage />
              </Suspense>
            }
          />
          <Route
            path="settings"
            element={
              <Suspense fallback={<PageLoader />}>
                <SettingsPage />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
