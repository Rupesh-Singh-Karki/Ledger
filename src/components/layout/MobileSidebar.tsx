import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from '@/components/ui/sheet';
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
          className="lg:hidden rounded-full hover:bg-secondary/80 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] bg-sidebar p-0 border-r-0 shadow-2xl" showCloseButton={false}>
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className="flex items-center justify-between px-6 py-5 border-b border-border/50 bg-card/50">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-income/10 border border-income/20 flex items-center justify-center shadow-[0_0_15px_rgba(45,212,191,0.15)]">
              <Wallet className="h-5 w-5 text-income rotate-12" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">Ledger</span>
          </div>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:bg-secondary/80">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
               <span className="sr-only">Close</span>
            </Button>
          </SheetClose>
        </div>
        <Sidebar onLinkClick={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
