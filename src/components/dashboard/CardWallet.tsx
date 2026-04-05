import { useStore } from '@/store';
import { formatCurrency } from '@/utils/formatCurrency';
import { ChevronLeft, ChevronRight, CreditCard, Wifi } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface CardWalletProps {
  isLoading: boolean;
}

function VisaLogo() {
  return (
    <svg viewBox="0 0 780 500" className="h-8 w-auto" fill="none">
      <path
        d="M293.2 348.7l33.4-195.7h53.3l-33.4 195.7H293.2zM541.1 157.6c-10.6-4-27.2-8.3-47.9-8.3c-52.8 0-90 26.6-90.3 64.7c-.3 28.2 26.6 43.9 46.9 53.3c20.8 9.6 27.8 15.7 27.7 24.3c-.1 13.1-16.6 19.1-32 19.1c-21.4 0-32.7-3-50.3-10.2l-6.9-3.1l-7.5 43.8c12.5 5.5 35.6 10.2 59.6 10.5c56.1 0 92.5-26.2 92.9-67c.2-22.3-14.1-39.3-45-53.3c-18.7-9.1-30.2-15.1-30.1-24.3c0-8.1 9.7-16.8 30.7-16.8c17.5-.3 30.2 3.5 40.1 7.5l4.8 2.3l7.3-42.5zM676.4 153h-41.3c-12.8 0-22.4 3.5-28 16.3l-79.4 179.4h56.1s9.2-24.1 11.2-29.4h68.5c1.6 6.9 6.5 29.4 6.5 29.4H720L676.4 153zm-65.9 126c4.4-11.3 21.4-54.7 21.4-54.7c-.3.5 4.4-11.4 7.1-18.8l3.6 17s10.3 47 12.4 56.5h-44.5zM231.4 153l-52.3 133.5l-5.6-27.1c-9.7-31.2-39.8-65-73.5-81.9l47.8 171.1h56.5l84-195.6h-56.9z"
        fill="white"
      />
      <path
        d="M131.9 153H44.2l-.7 4c67 16.2 111.4 55.3 129.8 102.3L155.4 170c-3-11.8-12.8-16.5-23.5-17z"
        fill="rgba(255,255,255,0.7)"
      />
    </svg>
  );
}

function MastercardLogo() {
  return (
    <svg viewBox="0 0 131 86" className="h-8 w-auto" fill="none">
      <circle cx="44" cy="43" r="40" fill="#EB001B" opacity="0.8" />
      <circle cx="87" cy="43" r="40" fill="#F79E1B" opacity="0.8" />
      <path
        d="M65.5 12.3C58.6 17.9 53.5 25.4 51 34h29c-2.5-8.6-7.6-16.1-14.5-21.7zM51 53c2.5 8.6 7.6 16.1 14.5 21.7 6.9-5.6 12-13.1 14.5-21.7H51z"
        fill="#FF5F00"
        opacity="0.8"
      />
    </svg>
  );
}

function CreditCardVisual({ card, isCurrent }: { card: ReturnType<typeof useStore.getState>['cards'][0]; isCurrent: boolean }) {
  return (
    <div
      className={`absolute inset-0 rounded-2xl overflow-hidden transition-all duration-500 ${
        isCurrent ? 'scale-100 opacity-100 z-10' : 'scale-95 opacity-0 z-0'
      }`}
      style={{
        background: card.gradient,
      }}
    >
      {/* Glassmorphic overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />

      {/* Shimmer effect */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 45%, rgba(255,255,255,0.1) 50%, transparent 55%)',
        }}
      />

      {/* Card content */}
      <div className="relative h-full flex flex-col justify-between p-5">
        {/* Top row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-white/60" />
            <span className="text-xs font-medium text-white/60 uppercase tracking-widest">
              {card.variant}
            </span>
          </div>
          <Wifi className="h-5 w-5 text-white/40 rotate-90" />
        </div>

        {/* Chip */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-7 rounded-md bg-gradient-to-br from-yellow-300/60 to-yellow-600/40 border border-yellow-400/20" />
        </div>

        {/* Card number */}
        <p className="text-lg tracking-[0.25em] text-white/90 font-mono">
          {card.cardNumber}
        </p>

        {/* Bottom row */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">Card Holder</p>
            <p className="text-sm text-white/90 font-medium tracking-wide">{card.cardHolder}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">Expires</p>
            <p className="text-sm text-white/90 font-medium">{card.expiryDate}</p>
          </div>
          {card.type === 'visa' ? <VisaLogo /> : <MastercardLogo />}
        </div>
      </div>
    </div>
  );
}

export function CardWallet({ isLoading }: CardWalletProps) {
  const cards = useStore((s) => s.cards);
  const activeCardIndex = useStore((s) => s.activeCardIndex);
  const setActiveCardIndex = useStore((s) => s.setActiveCardIndex);

  if (isLoading) {
    return <Skeleton className="h-80 rounded-3xl" />;
  }

  const activeCard = cards[activeCardIndex];
  if (!activeCard) return null;

  const handlePrev = () => {
    setActiveCardIndex(activeCardIndex === 0 ? cards.length - 1 : activeCardIndex - 1);
  };

  const handleNext = () => {
    setActiveCardIndex(activeCardIndex === cards.length - 1 ? 0 : activeCardIndex + 1);
  };

  const utilization = activeCard.creditLimit > 0
    ? (activeCard.balance / activeCard.creditLimit) * 100
    : 0;

  return (
    <div className="bg-card rounded-3xl p-6 shadow-[var(--shadow)] h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-medium text-foreground">Cards & Wallet</h3>
        <span className="text-xs text-muted-foreground">{cards.length} card{cards.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Card display */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative w-full flex justify-center items-center" style={{ minHeight: 200 }}>
          {/* Left arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-card-hover transition-colors"
            aria-label="Previous card"
          >
            <ChevronLeft className="h-4 w-4 text-foreground" />
          </button>

          {/* Cards stack — centered */}
          <div className="w-full max-w-[380px] relative" style={{ aspectRatio: '1.6/1' }}>
            {cards.map((card, index) => (
              <CreditCardVisual
                key={card.id}
                card={card}
                isCurrent={index === activeCardIndex}
              />
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-card-hover transition-colors"
            aria-label="Next card"
          >
            <ChevronRight className="h-4 w-4 text-foreground" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center gap-2 mt-4">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveCardIndex(index)}
              className={`rounded-full transition-all duration-300 ${
                index === activeCardIndex
                  ? 'h-2.5 w-6 bg-primary'
                  : 'h-2 w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Simplified card details — just utilization + limit */}
      {activeCard.variant === 'credit' && activeCard.creditLimit > 0 && (
        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-muted-foreground">
              Limit {formatCurrency(activeCard.creditLimit)}
            </span>
            <span className="text-xs font-medium text-foreground">{utilization.toFixed(1)}% used</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${Math.min(utilization, 100)}%`,
                background: utilization > 75 ? 'var(--negative)' : utilization > 50 ? '#F59E0B' : 'var(--primary)',
              }}
            />
          </div>
        </div>
      )}

      {activeCard.variant === 'debit' && (
        <div className="mt-auto pt-5 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Balance</span>
          <span className="text-sm font-semibold text-foreground">{formatCurrency(activeCard.balance)}</span>
        </div>
      )}
    </div>
  );
}
