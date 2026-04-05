import { useState, useRef, useEffect, useCallback } from 'react';
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths, isSameDay, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface DatePickerProps {
  value: string; // ISO format "YYYY-MM-DD"
  onChange: (date: string) => void;
  id?: string;
  className?: string;
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function DatePicker({ value, onChange, id, className = '' }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => {
    try {
      return parseISO(value);
    } catch {
      return new Date();
    }
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedDate = (() => {
    try {
      return parseISO(value);
    } catch {
      return new Date();
    }
  })();

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(viewDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDayOfWeek = getDay(monthStart);

  const handleDateSelect = useCallback((day: Date) => {
    onChange(format(day, 'yyyy-MM-dd'));
    setIsOpen(false);
  }, [onChange]);

  const handlePrevMonth = useCallback(() => {
    setViewDate((prev) => subMonths(prev, 1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setViewDate((prev) => addMonths(prev, 1));
  }, []);

  // Format display value as "DD MMM YYYY"
  const displayValue = format(selectedDate, 'dd MMM yyyy');

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Trigger button */}
      <button
        type="button"
        id={id}
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setViewDate(selectedDate);
          }
        }}
        className="w-full flex items-center gap-2 px-4 py-2 h-10 rounded-full bg-input border border-border text-sm text-foreground hover:bg-card-hover transition-colors text-left"
      >
        <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
        <span>{displayValue}</span>
      </button>

      {/* Calendar dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-2xl shadow-lg z-50 p-4 w-[300px] animate-fade-in">
          {/* Month/Year header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-card-hover transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4 text-muted-foreground" />
            </button>
            <span className="text-sm font-medium text-foreground">
              {format(viewDate, 'MMMM yyyy')}
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-card-hover transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-0 mb-2">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="h-8 flex items-center justify-center text-xs font-medium text-muted-foreground"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-0">
            {/* Empty spacers */}
            {Array.from({ length: startDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="h-9" />
            ))}

            {/* Days */}
            {daysInMonth.map((day) => {
              const isSelected = isSameDay(day, selectedDate);
              const isTodayDate = isToday(day);

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  onClick={() => handleDateSelect(day)}
                  className={`h-9 w-full rounded-lg text-sm font-medium transition-all duration-150 ${
                    isSelected
                      ? 'bg-primary text-primary-foreground'
                      : isTodayDate
                        ? 'bg-primary/15 text-primary hover:bg-primary/25'
                        : 'text-foreground hover:bg-card-hover'
                  }`}
                >
                  {format(day, 'd')}
                </button>
              );
            })}
          </div>

          {/* Today shortcut */}
          <div className="mt-3 pt-3 border-t border-border">
            <button
              type="button"
              onClick={() => {
                const today = new Date();
                onChange(format(today, 'yyyy-MM-dd'));
                setViewDate(today);
                setIsOpen(false);
              }}
              className="w-full text-xs text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Go to Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
