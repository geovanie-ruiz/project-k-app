'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Spoiler } from '@/payload-types';
import { showDateTitle } from '@/utils/utils';
import { CldImage } from 'next-cloudinary';
import { useInView } from 'react-intersection-observer';
import { fetchSpoilers } from '../_actions/fetchSpoilers';
import { SpoilerModal } from './spoilerModal';

// Page is arbitrarily set number of spoilers to load each request
export const SPOILERS_PER_PAGE = 6;

export function SpoilerList() {
  const [spoilers, setSpoilers] = useState<Spoiler[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSpoiler, setSelectedSpoiler] = useState<Spoiler | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { ref, inView } = useInView();

  const loadMoreSpoilers = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const result = await fetchSpoilers(page, SPOILERS_PER_PAGE);
      if (result.spoilers.length === 0) {
        setHasMore(false);
      } else {
        setSpoilers((prevSpoilers) => [...prevSpoilers, ...result.spoilers]);
      }
      setPage((prevPage) => prevPage + 1);
      setHasMore(result.hasMore);
    } catch (error) {
      console.error('Error loading more articles:', error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (inView) {
      loadMoreSpoilers();
    }
  }, [inView]);

  useEffect(() => {
    if (inView && !isLoading) {
      loadMoreSpoilers();
    }
  }, [isLoading]);

  const isHorizontal = (spoiler: Spoiler) => {
    return spoiler.type === 'Battlefield';
  };

  const handleSpoilerClick = (spoiler: Spoiler) => {
    setSelectedSpoiler(spoiler);
    setIsModalOpen(true);
  };

  const renderSpoiler = (spoiler: Spoiler) => {
    return (
      <div
        key={spoiler.id}
        className={`cursor-pointer overflow-hidden ${
          isHorizontal(spoiler) ? 'col-span-2 ' : 'col-span-1'
        }`}
        onClick={() => handleSpoilerClick(spoiler)}
      >
        <div
          className={`relative w-full`}
          style={{
            paddingBottom: isHorizontal(spoiler)
              ? 'calc(63 / 88 * 100%)'
              : 'calc(88 / 63 * 100%)',
          }}
        >
          {spoiler.card_art &&
          typeof spoiler.card_art !== 'number' &&
          spoiler.card_art.filename ? (
            <CldImage
              src={spoiler.card_art.filename}
              alt={spoiler.description || 'Spoiler Image'}
              fill
              className="object-cover"
              sizes={
                isHorizontal(spoiler)
                  ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 66vw'
                  : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              }
            />
          ) : (
            <CldImage
              src={'cardback-black'}
              alt="Card without front image"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
      </div>
    );
  };

  const groupedSpoilers = spoilers.reduce(
    (acc, spoiler) => {
      if (!acc[spoiler.createdAt]) {
        acc[spoiler.createdAt] = {
          publication_date: spoiler.createdAt,
          spoilers: [],
        };
      }
      acc[spoiler.createdAt].spoilers.push(spoiler);
      return acc;
    },
    {} as Record<string, { publication_date: string; spoilers: Spoiler[] }>
  );

  return (
    <div className="space-y-8">
      {Object.values(groupedSpoilers).map(({ publication_date, spoilers }) => (
        <Card key={publication_date} className="p-6 bg-secondary/20">
          <CardHeader>
            <div className="flex items-center justify-between mb-4 align-middle bg-neutral-200 dark:bg-gray-800 rounded-full p-4">
              <h2 className="hidden text-2xl font-bold md:flex items-center">
                {showDateTitle(publication_date)}
              </h2>
              <p className="md:hidden text-center w-full">
                {showDateTitle(publication_date, true)}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-flow-dense grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {spoilers.map((spoiler) => renderSpoiler(spoiler))}
            </div>
          </CardContent>
        </Card>
      ))}
      {hasMore && (
        <div ref={ref} className="flex justify-center py-4">
          {isLoading ? (
            <p className="text-muted-foreground">Loading more spoilers...</p>
          ) : (
            <Button onClick={loadMoreSpoilers} variant="outline">
              Load More
            </Button>
          )}
        </div>
      )}
      {!hasMore && (
        <p className="text-center text-muted-foreground py-4">
          No more spoilers to load.
        </p>
      )}
      {selectedSpoiler && (
        <SpoilerModal
          spoiler={selectedSpoiler}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
