import { cn } from '@/utils/utils';
import React from 'react';
import { IconProps } from './ComponentIcon';

const ChampionIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
      <path d="M153.12 9.35c-48.84 0-118.38 66.81-118.38 66.81l7.81 141.04s32.82 73.45 70.91 73.45v-114.2l-33.4-23.13s-4.69-23.64-6.25-42.39c0 0 64.07 28.52 64.07 39.07v45.71h30.48V150c0-10.55 64.08-39.07 64.08-39.07-1.56 18.75-6.25 42.39-6.25 42.39l-33.41 23.13v114.2c38.09 0 70.91-73.45 70.91-73.45l7.81-141.04S201.95 9.35 153.12 9.35m39.07 81.99-39.07 24.67-39.07-24.67-52.94-7.61 62.29-4.46 29.72 23.25 29.72-23.25 62.3 4.46-52.94 7.61Z" />
    </svg>
  )
);

ChampionIcon.displayName = 'ChampionIcon';
export default ChampionIcon;
