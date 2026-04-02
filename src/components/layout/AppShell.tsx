import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function AppShell() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-16 bottom-0 w-60 bg-sidebar aurora-gradient hidden lg:block overflow-y-auto border-r border-border">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="pt-16 lg:pl-60 min-h-screen">
        <div className="max-w-7xl mx-auto p-4 lg:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
