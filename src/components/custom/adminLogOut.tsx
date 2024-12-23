'use client';

import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

const AdminLogOut = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href="/" className={buttonVariants({ variant: 'ghost' })}>
            <LogOut />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Exit Admin</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AdminLogOut;
