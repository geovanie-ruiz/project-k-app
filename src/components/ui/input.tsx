'use client';

import { cn } from '@/utils/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const inputVariants = cva(
  'flex w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-2 text-xs',
        md: 'h-10 px-3',
        lg: 'h-12 px-4 text-lg',
      },
      variant: {
        default: '',
        error: 'border-destructive focus-visible:ring-destructive',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  asChild?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : 'input';

    return (
      <Comp
        type={type}
        className={cn(inputVariants({ size, variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input, inputVariants };
