'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InView } from 'react-intersection-observer';

import { Media, Set } from '@/payload-types';
import { isFutureDate, showDateTitle } from '@/utils';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import { useState } from 'react';
import { fetchSets } from '../_actions/fetchSets';

export const SETS_PER_PAGE = 10;

export const formatReleaseDate = (date: string | null | undefined) => {
  if (!date) return 'Unconfirmed Release Date';
  if (isFutureDate(date)) return `Releasing on ${showDateTitle(date)}`;
  return `Released on ${showDateTitle(date)}`;
};

export function SetList() {
  const [sets, setSets] = useState<Set[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreSets = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const result = await fetchSets(page, SETS_PER_PAGE);
      if (result.sets.length === 0) {
        setHasMore(false);
      } else {
        setSets((prevSets) => [...prevSets, ...result.sets]);
      }
      setPage((prevPage) => prevPage + 1);
      setHasMore(result.hasMore);
    } catch (error) {
      console.error('Error loading more sets:', error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInViewChange = (inView: boolean) => {
    if (inView && !isLoading) {
      loadMoreSets();
    }
  };

  const renderSet = (set: Set) => {
    const heroImage = set.key_art as Media;

    return (
      <Card key={`set-${set.id}`} className="h-full flex flex-col">
        <CardHeader className="p-0">
          <div className="relative w-full pt-[56.25%]">
            <Link href={`/sets/${set.set_code}`} className="hover:pointer">
              <CldImage
                src={heroImage?.filename ?? 'cardback-blue'}
                alt={set.name}
                fill
                crop="fill"
                gravity="auto"
                className="rounded-t-lg object-cover"
              />
            </Link>
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <CardTitle className="mb-2">
            <Link href={`/sets/${set.set_code}`} className="hover:underline">
              {set.name}
            </Link>
          </CardTitle>
          <p className="text-sm mb-4">{set.description}</p>
          <div className="flex flex-col md:flex-row">
            <span className="text-sm">{set.total} New Cards</span>
            <span className="mx-2 max-sm:hidden">·</span>
            <span className="text-sm">{formatReleaseDate(set.releasedAt)}</span>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sets.map((set) => renderSet(set))}
      </div>
      {isLoading && (
        <p className="text-center text-muted-foreground py-4">
          Loading more sets...
        </p>
      )}
      {hasMore && !isLoading && (
        <InView
          onChange={handleInViewChange}
          trackVisibility={true}
          delay={100}
          initialInView={true}
        >
          {({ ref }) => (
            <div ref={ref} className="text-center">
              <Button onClick={loadMoreSets} variant="outline">
                Load More
              </Button>
            </div>
          )}
        </InView>
      )}
      {!hasMore && (
        <p className="text-center text-muted-foreground py-4">
          No more sets to load.
        </p>
      )}
    </div>
  );
}
