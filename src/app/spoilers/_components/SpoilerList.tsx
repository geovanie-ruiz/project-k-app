'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Spoiler } from '../_types/spoiler';

import { useInView } from 'react-intersection-observer';
import { fetchSpoilers } from '../_actions/fetchSpoilers';

interface SpoilerListProps {
  initialSpoilers: Spoiler[];
}

const SpoilerList = ({ initialSpoilers }: SpoilerListProps) => {
  const [spoilers, setSpoilers] = useState<Spoiler[]>(initialSpoilers);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView();

  const loadMoreSpoilers = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    const nextPage = page + 1;
    const result = await fetchSpoilers(nextPage);
    setSpoilers((prevSpoilers) => [...prevSpoilers, ...result.spoilers]);
    setPage(nextPage);
    setHasMore(result.hasMore);
    setIsLoading(false);
  };

  useEffect(() => {
    if (inView) {
      loadMoreSpoilers();
    }
  });

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {spoilers.map((spoiler) => (
          <Card
            key={spoiler.id}
            className="flex flex-col h-full border-none shadow-none"
          >
            {spoiler.image_url && (
              <Image
                src={spoiler.image_url}
                alt={spoiler.description || ''}
                width={338}
                height={450}
                className="object-cover"
              />
            )}
          </Card>
        ))}
      </div>
      {hasMore && (
        <div ref={ref} className="flex justify-center">
          {isLoading ? (
            <p>Loading more spoilers...</p>
          ) : (
            <Button onClick={loadMoreSpoilers}>Load More</Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SpoilerList;
