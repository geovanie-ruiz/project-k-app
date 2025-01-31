import { Skeleton } from '@/components/ui/skeleton';

export const CalendarSkeleton = () => {
  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-48" />
        <div className="flex space-x-2">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 7 }).map((_, index) => (
          <Skeleton key={index} className="h-6 w-full" />
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 35 }).map((_, index) => (
          <div key={index} className="aspect-square">
            <Skeleton className="h-full w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};
