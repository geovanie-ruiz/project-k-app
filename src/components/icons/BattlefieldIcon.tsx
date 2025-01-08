import { cn } from '@/utils/utils';
import React from 'react';
import { IconProps } from './ComponentIcon';

const BattlefieldIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      {...props}
      className={cn('relative flex-shrink size-6', className)}
      width="300"
      height="300"
      viewBox="0 0 300 300"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M42.51 81.11v172.54l41.45-35.74 68.4 78.76 68.4-78.76 41.45 35.74V81.11zm109.85 141.01-23.68-29.43 23.68-29.43 23.68 29.43zm137.32-172.1H14.53V6.5h275.15v43.53Z" />
    </svg>
  )
);

BattlefieldIcon.displayName = 'BattlefieldIcon';
export default BattlefieldIcon;
