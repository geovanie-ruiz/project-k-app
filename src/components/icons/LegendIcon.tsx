import { cn } from '@/utils/utils';
import * as React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {}

const LegendIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      {...props}
      className={cn('relative top-0.5 flex-shrink h-[1em] w-[1em]', className)}
      width="300"
      height="300"
      viewBox="0 0 300 300"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M248.69 198.29V49.21h-56.45L153.17 2.89l-39.08 46.32H57.64v149.08l-24.61 20.26 66.58 75.27h28.95V166.45l-37.63-17.37v-34.74l36.19 7.24 26.05 27.5 26.05-27.5 36.18-7.24v34.74l-37.63 17.37v127.37h28.95l66.58-75.27zM153.17 100l-16.99-23.29 16.99-23.28 16.99 23.28z" />
    </svg>
  )
);

LegendIcon.displayName = 'LegendIcon';
export default LegendIcon;
