import { cn } from '@/utils/utils';
import React from 'react';
import { IconProps } from './ComponentIcon';

const TCGPlayerIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      {...props}
      className={cn('relative flex-shrink size-6', className)}
      width={24}
      height={17.796}
      viewBox="14.032 61.435 24 17.796"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath id="a">
        <path d="M0 25h200v150H0z" />
      </clipPath>
      <g clipPath="url(#a)" transform="matrix(.12 0 0 .12 14.032 58.327)">
        <path
          fill="#ffc412"
          d="M10.3 43.5C3.7 44.5-.9 50.6.1 57.3l14.1 94.9c1 6.6 7.1 11.2 13.8 10.2l18.2-2.7V38.1z"
        />
        <path
          fill="#df2923"
          d="m189.7 43.5-35.5-5.3v121.4l17.8 2.7c6.6 1 12.8-3.6 13.8-10.2l14.1-94.9c.9-6.6-3.6-12.7-10.2-13.7z"
        />
        <path
          fill="#315ff3"
          d="M142.1 25.9H58.3c-6.7 0-12.1 5.4-12.1 12.1v124.1c0 6.7 5.4 12.1 12.1 12.1H142c6.7 0 12.1-5.4 12.1-12.1V37.9c.1-6.6-5.3-12-12-12zM110 67.2h26.9c.9 0 1.2 1.1.5 1.6l-20.9 15.1c-.5.3-.5 1-.1 1.4L127 96.1c.4.4.3 1-.1 1.4L103 114.1l-1.8 1.2.9 4.5 3 14.6c.2.9-1 1.5-1.6.7l-3.1-3.8-1.1-1.3-19.8-24.2c-.4-.5-.2-1.1.3-1.4l11.6-8.1c.6-.3.7-1 .2-1.4L62.5 68.7c-.6-.6-.2-1.5.6-1.5z"
        />
        <path
          fill="#fff"
          d="M136.9 67.2H63.1c-.8 0-1.2 1-.6 1.5L91.6 95c.5.4.3 1.2-.2 1.4l-11.6 8.1c-.5.3-.7.9-.3 1.4l19.8 24.2 1.1 1.3 3.1 3.8c.6.7 1.8.2 1.6-.7l-3-14.6-.9-4.5 1.8-1.2 23.9-16.6c.5-.3.5-1 .1-1.4l-10.6-10.8c-.4-.4-.3-1 .1-1.4l20.8-15.1c.9-.5.5-1.7-.4-1.7z"
        />
      </g>
    </svg>
  )
);

TCGPlayerIcon.displayName = 'TCGPlayerIcon';
export default TCGPlayerIcon;
