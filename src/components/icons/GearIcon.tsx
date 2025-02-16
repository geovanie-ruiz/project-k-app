import { cn } from '@/utils';
import * as React from 'react';
import { IconProps } from './ComponentIcon';

const GearIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
      <path d="M247.17 248.62c-27.39 32.48-80.12 60.7-163.49 37.23 29.14-32.37 42.09-96.22 22.66-123.74l67.98-66.37 46.94 13.67c3.24 58.27-11.33 114.93-76.08 160.25 101.98-21.04 111.5-116.4 110.29-164.96 0 0 18.95-2.35 28.67-17.32 12.95 67.58-2.17 119.96-36.98 161.24ZM162.03 4.97 17.27 137.74v59.69L187.41 35.16z" />
    </svg>
  )
);

GearIcon.displayName = 'GearIcon';
export default GearIcon;
