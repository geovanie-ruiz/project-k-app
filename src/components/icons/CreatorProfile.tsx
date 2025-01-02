import { cn } from '@/utils/utils';
import React from 'react';

// interface IconProps extends React.SVGProps<SVGSVGElement> {}

const ProfileIcon = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>(({ className, ...props }, ref) => (
  <svg
    ref={ref}
    {...props}
    className={cn('relative flex-shrink h-[1em] w-[1em] align-top', className)}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
));

ProfileIcon.displayName = 'ProfileIcon';
export default ProfileIcon;
