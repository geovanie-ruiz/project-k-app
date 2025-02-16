import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function DeckViewLoading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="p-6">
        <Skeleton className="h-8 w-64 mb-6" />
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Legend Section */}
            <Card className="p-4">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-full" />
                ))}
              </div>
            </Card>

            {/* Battlefields Section */}
            <Card className="p-4">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-full" />
                ))}
              </div>
            </Card>

            {/* Main Deck Section */}
            <Card className="p-4 md:col-span-2">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-full" />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
}
