'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Spoiler } from '../_types/spoiler';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ChevronDown } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { fetchSpoilers } from '../_actions/fetchSpoilers';
import { Spoiler } from '../_types/spoiler';

interface SpoilerListProps {
  initialSpoilers: Spoiler[];
}

// Page is arbitrarily set number of spoilers to load each request
export const SPOILERS_PER_PAGE = 6;

export function SpoilerList({ initialSpoilers }: SpoilerListProps) {
  const [spoilers, setSpoilers] = useState<Spoiler[]>(initialSpoilers);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showNoImageToggles, setShowNoImageToggles] = useState<
    Record<string, boolean>
  >({});
  const [collapsedSets, setCollapsedSets] = useState<Record<string, boolean>>(
    {}
  );
  const { ref, inView } = useInView();

  useEffect(() => {
    const initialToggles = initialSpoilers.reduce((acc, spoiler) => {
      acc[spoiler.published_on] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setShowNoImageToggles(initialToggles);
  }, [initialSpoilers]);

  const loadMoreSpoilers = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const result = await fetchSpoilers(page, SPOILERS_PER_PAGE);
      if (result.spoilers.length === 0) {
        setHasMore(false);
      } else {
        setSpoilers((prevSpoilers) => [...prevSpoilers, ...result.spoilers]);
        setShowNoImageToggles((prevToggles) => ({
          ...prevToggles,
          ...result.spoilers.reduce((acc, spoiler) => {
            acc[spoiler.published_on] = true;
            return acc;
          }, {} as Record<string, boolean>),
        }));
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

  const toggleSetCollapse = (setId: string) => {
    setCollapsedSets((prev) => ({ ...prev, [setId]: !prev[setId] }));
  };

  useEffect(() => {
    if (inView) {
      loadMoreSpoilers();
    }
  }, [inView]);

  const renderSpoiler = (spoiler: Spoiler, showNoImage: boolean) => {
    if (!showNoImage && !spoiler.image_url) return null;

    return (
      <Card key={spoiler.id} className="overflow-hidden">
        <div
          className="relative w-full"
          style={{ paddingBottom: 'calc(88 / 63 * 100%)' }}
        >
          {spoiler.image_url ? (
            <Image
              src={spoiler.image_url}
              alt={spoiler.description || 'Spoiler Image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <Image
              src="32be31f2-ef85-4ef5-c169-4a0114388e00/card"
              alt="Card without front image"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
      </Card>
    );
  };

  const groupedSpoilers = spoilers.reduce((acc, spoiler) => {
    if (!acc[spoiler.published_on]) {
      acc[spoiler.published_on] = {
        publication_date: spoiler.published_on,
        spoilers: [],
      };
    }
    acc[spoiler.published_on].spoilers.push(spoiler);
    return acc;
  }, {} as Record<string, { publication_date: string; spoilers: Spoiler[] }>);

  const showDateTitle = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-8">
      {Object.values(groupedSpoilers).map(({ publication_date, spoilers }) => (
        <Card key={publication_date} className="p-6 bg-secondary/20">
          <CardHeader>
            <div
              className="flex items-center justify-between cursor-pointer mb-4 align-middle bg-neutral-200 dark:bg-gray-800 rounded-full p-4"
              onClick={() => toggleSetCollapse(publication_date)}
            >
              <h2 className="text-2xl font-bold flex items-center">
                <ChevronDown
                  className={`mr-2 h-6 w-6 transition-transform ${
                    collapsedSets[publication_date] ? 'rotate-180' : ''
                  }`}
                />
                {showDateTitle(publication_date)}
              </h2>
              <div className="flex items-center space-x-2">
                <Switch
                  id={`show-no-image-${publication_date}`}
                  checked={showNoImageToggles[publication_date]}
                  onCheckedChange={(checked) => {
                    setShowNoImageToggles((prev) => ({
                      ...prev,
                      [publication_date]: checked,
                    }));
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
                <Label
                  htmlFor={`show-no-image-${publication_date}`}
                  onClick={(e) => e.stopPropagation()} // Prevent label click from collapsing the set
                >
                  Show Spoilers without images
                </Label>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {!collapsedSets[publication_date] && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {spoilers.map((spoiler) =>
                  renderSpoiler(spoiler, showNoImageToggles[publication_date])
                )}
              </div>
            )}
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
    </div>
  );
}
