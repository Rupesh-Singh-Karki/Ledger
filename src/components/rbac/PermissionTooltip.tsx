import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PermissionTooltipProps {
  message?: string;
  children?: React.ReactNode;
}

export function PermissionTooltip({ message = 'Switch to Admin to manage transactions', children }: PermissionTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {children || (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full opacity-50 cursor-not-allowed"
            disabled
            aria-label={message}
          >
            <Lock className="h-4 w-4" />
          </Button>
        )}
      </TooltipTrigger>
      <TooltipContent className="rounded-xl">
        <p className="text-xs">{message}</p>
      </TooltipContent>
    </Tooltip>
  );
}
