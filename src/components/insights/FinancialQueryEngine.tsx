import { useState, useCallback, useRef, useEffect } from 'react';
import { useStore } from '@/store';
import { parseQuery, type QueryResult } from '@/utils/queryParser';
import { Search, MessageSquare, Sparkles, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const SUGGESTION_CHIPS = [
  'How much did I spend on Dining?',
  "What's my savings rate?",
  'Compare October and September',
  "What's my biggest expense?",
  'How much did I earn in November?',
  'Where am I spending the most?',
  "What's my total balance?",
  'How much on Groceries in December?',
];

type QueryState = 'empty' | 'loading' | 'answer';

export function FinancialQueryEngine() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<QueryResult | null>(null);
  const [state, setState] = useState<QueryState>('empty');
  const inputRef = useRef<HTMLInputElement>(null);
  const transactions = useStore((s) => s.transactions);

  const handleSubmit = useCallback(
    (queryText?: string) => {
      const q = queryText ?? query;
      if (!q.trim()) return;

      setState('loading');
      setResult(null);

      // 400ms fake delay for UX polish
      setTimeout(() => {
        const parsed = parseQuery(q, transactions);
        setResult(parsed);
        setState('answer');
      }, 400);
    },
    [query, transactions]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleChipClick = (chip: string) => {
    setQuery(chip);
    handleSubmit(chip);
  };

  // Auto-focus input on mount
  useEffect(() => {
    // Small delay to avoid dialog focus issues
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-card rounded-3xl p-6 shadow-[var(--shadow)]" id="financial-query-engine">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="h-4 w-4 text-primary" />
        <h3 className="text-base font-medium text-foreground">Ask your finances anything</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-5">Powered by your transaction data</p>

      {/* Search input */}
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about your finances... e.g. 'How much did I spend on food?'"
            className="w-full h-11 pl-10 pr-4 rounded-full bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            id="query-input"
          />
        </div>
        <button
          type="button"
          onClick={() => handleSubmit()}
          disabled={!query.trim() || state === 'loading'}
          className="h-11 px-5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
          id="query-submit"
        >
          Ask
        </button>
      </div>

      {/* Suggestion chips */}
      <div className="flex flex-wrap gap-2 mb-5">
        {SUGGESTION_CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => handleChipClick(chip)}
            className="px-3 py-1.5 rounded-full bg-input border border-border text-xs text-muted-foreground hover:text-foreground hover:bg-card-hover transition-colors duration-150"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Answer area */}
      {state === 'loading' && (
        <div className="rounded-2xl border-l-[3px] border-primary bg-card p-5 shadow-[var(--shadow)] animate-fade-in">
          <div className="flex items-start gap-4">
            <Skeleton className="h-10 w-10 rounded-full shrink-0" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-7 w-1/3" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        </div>
      )}

      {state === 'answer' && result && (
        <div
          className={`rounded-2xl border-l-[3px] p-5 shadow-[var(--shadow)] animate-fade-in ${
            result.confidence === 'low'
              ? 'border-muted-foreground/40 bg-muted/30'
              : 'border-primary bg-card'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
              result.confidence === 'low' ? 'bg-muted' : 'bg-primary/15'
            }`}>
              {result.confidence === 'low' ? (
                <AlertCircle className="h-5 w-5 text-muted-foreground" />
              ) : (
                <MessageSquare className="h-5 w-5 text-primary" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              {result.value && (
                <p className="text-2xl font-semibold text-primary mb-2">{result.value}</p>
              )}
              <p className="text-sm text-foreground leading-relaxed">{result.answer}</p>
              {result.confidence === 'low' && (
                <p className="text-xs text-muted-foreground mt-3 italic">
                  This is my best interpretation — try rephrasing if this seems off.
                </p>
              )}
              {result.relatedCategory && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-foreground mt-3 mr-2">
                  {result.relatedCategory}
                </span>
              )}
              {result.relatedMonth && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/15 text-primary mt-3">
                  {result.relatedMonth}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
