'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface ActionTooltipProps {
  children: React.ReactNode;
  label: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  delay?: number
}

export const ActionTooltip = ({
  children,
  label,
  side,
  align,
  delay,
}: ActionTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={delay ?? 25}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p className="font-semibold text-sm">
            {label}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
