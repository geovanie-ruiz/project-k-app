'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Media, Card as TradingCard } from '@/payload-types';
import { InView } from 'react-intersection-observer';

import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import { useState } from 'react';
import { fetchCards } from '../_actions/fetchCards';

export const CARDS_PER_PAGE = 12;

export function CardList() {
  const [cards, setCards] = useState<TradingCard[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreCards = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const result = await fetchCards({ page, pageSize: CARDS_PER_PAGE });
      if (result.cards.length === 0) {
        setHasMore(false);
      } else {
        setCards((prevCards) => [...prevCards, ...result.cards]);
      }
      setPage((prevPage) => prevPage + 1);
      setHasMore(result.hasMore);
    } catch (error) {
      console.error('Error loading more cards:', error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInViewChange = (inView: boolean) => {
    if (inView && !isLoading) {
      loadMoreCards();
    }
  };

  const renderCard = (card: TradingCard) => {
    const cardArt = card.card_art as Media;

    return (
      <Card key={`card-${card.id}`} className="h-full flex flex-col">
        <CardContent className="flex-grow p-4">
          <CardTitle className="sr-only">{card.full_card_name}</CardTitle>
          <div className="relative w-full pt-[56.25%]">
            <Link href={`/cards/${card.id}`} className="hover:pointer">
              <CldImage
                src={cardArt?.filename ?? 'cardback-blue'}
                alt={card.full_card_name || 'Art for Unknown Card'}
                fill
                crop="fill"
                gravity="auto"
                className="rounded-t-lg object-cover"
              />
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => renderCard(card))}
      </div>
      {isLoading && (
        <p className="text-center text-muted-foreground py-4">
          Loading more cards...
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
              <Button onClick={loadMoreCards} variant="outline">
                Load More
              </Button>
            </div>
          )}
        </InView>
      )}
      {!hasMore && (
        <p className="text-center text-muted-foreground py-4">
          No more cards to load.
        </p>
      )}
    </div>
  );
}
