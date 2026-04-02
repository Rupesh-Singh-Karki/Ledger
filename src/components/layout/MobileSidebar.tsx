import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Wallet } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useState } from 'react';

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden rounded-full"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 bg-sidebar p-0 border-r-0">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className="flex items-center gap-2 px-6 py-5 border-b border-border">
          <div className="h-8 w-8 rounded-xl bg-income/20 flex items-center justify-center">
            <Wallet className="h-4 w-4 text-income" />
          </div>
          <span className="text-lg font-bold text-foreground">Ledger</span>
        </div>
        <Sidebar onLinkClick={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
