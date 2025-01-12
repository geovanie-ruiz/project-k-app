'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, Set } from '@/payload-types';
import { CldImage } from 'next-cloudinary';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchCards } from '../_actions/fetchCards';

export const CARDS_PER_PAGE = 10;

interface CardsListProps {
  filters: {
    runeFilters: string[];
    cardTypeFilters: string[];
    mightFilters: string[];
    costFilters: string[];
    runeCostFilters: string[];
  };
  addCardToDeck: (card: Card) => void;
}

export function CardsList({ filters, addCardToDeck }: CardsListProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [cardSize, setCardSize] = useState<'small' | 'medium' | 'large'>(
    'medium'
  );
  const [filterText, setFilterText] = useState('');
  const [filterType, setFilterType] = useState('name');

  const { ref, inView } = useInView();

  const loadMoreCards = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const result = await fetchCards(page, CARDS_PER_PAGE);
      if (!result.cards || result.cards.length === 0) {
        setHasMore(false);
      } else {
        const newCards = [...cards, ...result.cards];
        setCards(newCards);
        applyFilters(newCards, filterText, filterType);
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

  const applyFilters = (
    cardsToFilter: Card[],
    text: string,
    type: 'name' | 'text' | 'both' | string
  ) => {
    const lowerCaseText = text.toLowerCase();
    const filtered = cardsToFilter.filter((card) => {
      const matchesText =
        type === 'name'
          ? card.name.toLowerCase().includes(lowerCaseText)
          : type === 'text'
            ? (card.full_card_name?.toLowerCase().includes(lowerCaseText) ??
              false)
            : card.name.toLowerCase().includes(lowerCaseText) ||
              card.full_card_name?.toLowerCase().includes(lowerCaseText);

      const matchesRune =
        filters.runeFilters.length === 0 ||
        filters.runeFilters.some((rune) =>
          card.rune?.includes(
            rune as 'Calm' | 'Chaos' | 'Fury' | 'Mental' | 'Order' | 'Physical'
          )
        );

      const matchesCardType =
        filters.cardTypeFilters.length === 0 ||
        filters.cardTypeFilters.includes(card.type);

      const matchesMight =
        filters.mightFilters.length === 0 ||
        filters.mightFilters.some((might) =>
          might === '10+'
            ? card.might && card.might >= 10
            : card.might === parseInt(might)
        );

      const matchesCost =
        filters.costFilters.length === 0 ||
        filters.costFilters.some((cost) =>
          cost === '10+'
            ? card.cost && card.cost >= 10
            : card.cost === parseInt(cost)
        );

      const matchesRuneCost =
        filters.runeCostFilters.length === 0 ||
        filters.runeCostFilters.some((cost) =>
          card.recycle ? card.recycle.length === parseInt(cost) : false
        );

      return (
        matchesText &&
        matchesRune &&
        matchesCardType &&
        matchesMight &&
        matchesCost &&
        matchesRuneCost
      );
    });
    setFilteredCards(filtered);
  };

  // Apply filters whenever filters or cards change
  useEffect(() => {
    applyFilters(cards, filterText, filterType);
  }, [filters, filterText, filterType, cards]);

  // Load initial cards
  useEffect(() => {
    loadMoreCards();
  }, []);

  // Load more cards when scrolling
  useEffect(() => {
    if (inView && !isLoading) {
      loadMoreCards();
    }
  }, [inView, isLoading]);

  const getGridClass = () => {
    switch (cardSize) {
      case 'small':
        return 'grid-cols-6';
      case 'medium':
        return 'grid-cols-4';
      case 'large':
        return 'grid-cols-3';
      default:
        return 'grid-cols-4';
    }
  };

  if (!cards) return null;

  return (
    <div className="space-y-4">
      {/* Controls Section */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
        {/* Text Filter Controls */}
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Search..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <Select
            value={filterType}
            onValueChange={(value) => setFilterType(value)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Filter by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Size Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setCardSize('small')}>
            Small
          </Button>
          <Button variant="outline" onClick={() => setCardSize('medium')}>
            Medium
          </Button>
          <Button variant="outline" onClick={() => setCardSize('large')}>
            Large
          </Button>
        </div>
      </div>

      {/* Scrollable Cards Grid */}
      <div className="rounded-lg pr-2 max-h-[calc(100vh-14rem)] overflow-y-auto">
        <div className={`grid ${getGridClass()} gap-3 pb-2 pt-2`}>
          {filteredCards.map((card) => (
            <div
              onClick={() => addCardToDeck(card)}
              key={`${(card.set as Set).set_code}-${card.set_index}`}
              className="relative aspect-[240/336] cursor-pointer rounded-lg overflow-hidden bg-muted transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              {card.card_art && typeof card.card_art !== 'number' ? (
                <CldImage
                  src={card.card_art.filename || ''}
                  alt={card.name}
                  fill
                  className="object-cover rounded-md"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-muted-foreground">{card.name}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div ref={ref} className="flex justify-center py-4">
          {isLoading ? (
            <p className="text-muted-foreground">Loading more cards...</p>
          ) : (
            <Button onClick={loadMoreCards} variant="outline">
              Load More
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
