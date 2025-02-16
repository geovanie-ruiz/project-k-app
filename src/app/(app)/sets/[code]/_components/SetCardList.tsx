'use client';

import { Button } from '@/components/ui/button';
import { InView } from 'react-intersection-observer';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CardsVariant, Media, Set, Card as TradingCard } from '@/payload-types';
import { partition } from '@/utils';
import { SignInButton } from '@clerk/nextjs';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import {
  CardsCollected,
  QueryProps,
  queryCardsBySet,
} from '../_actions/queryCardsBySet';
import AddButton from './AddButton';

type SetCardListProps = {
  set: Set;
};

export const CARDS_PER_PAGE = 10;

export function SetCardList({ set }: SetCardListProps) {
  const [cards, setCards] = useState<TradingCard[]>([]);
  const [cardsCollected, setCardsCollected] = useState<CardsCollected[]>([]);
  const [battlefields, setBattlefields] = useState<TradingCard[]>([]);
  const [battleFieldsCollected, setBattlefieldsCollected] = useState<
    CardsCollected[]
  >([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const loadMoreCards = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const queryProps: QueryProps = {
        setId: set.id,
        page,
        pageSize: CARDS_PER_PAGE,
      };
      const result = await queryCardsBySet(queryProps);
      console.log('[Geo]', result);
      if (result.cards.length === 0) {
        setHasMore(false);
      } else {
        const [battlefields, cards] = partition<TradingCard>(
          result.cards,
          (card) => card.type === 'Battlefield'
        );
        setBattlefields((prevBattlefields) => [
          ...prevBattlefields,
          ...battlefields,
        ]);
        setCards((prevCards) => [...prevCards, ...cards]);

        const [battlefieldsCollected, cardsCollected] =
          partition<CardsCollected>(
            result.collected,
            (collected) => collected.isBattlefield
          );
        setBattlefieldsCollected((prevCollected) => [
          ...prevCollected,
          ...battlefieldsCollected,
        ]);
        setCardsCollected((prevCollected) => [
          ...prevCollected,
          ...cardsCollected,
        ]);
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

  const handleToggle = useCallback((id: number, isToggled: boolean) => {
    console.log('[Geo] adding', id, isToggled);
  }, []);

  const handleAnonClick = () => {
    setIsOpen(true);
  };

  const getCardArt = (variants: CardsVariant[]) => {
    if (variants.length === 0) return 'cardback-blue';
    const variant = variants[0];
    const art = variant.card_art as Media;
    return art.filename!;
  };

  const isHorizontal = (card: TradingCard) => {
    return card.type === 'Battlefield';
  };

  const isCollected = (card: TradingCard) => {
    if (card.type === 'Battlefield') {
      const battlefield = battleFieldsCollected.find(
        (collected) => collected.setIndex === card.set_index
      );
      if (battlefield) return battlefield.collected;
    } else {
      const cardCollected = cardsCollected.find(
        (collected) => collected.setIndex === card.set_index
      );
      if (cardCollected) return cardCollected.collected;
    }

    return false;
  };

  const renderCard = (card: TradingCard) => {
    const cardArtFilename = card.variants?.docs
      ? getCardArt(card.variants?.docs as CardsVariant[])
      : 'cardback-blue';
    const colSpan = isHorizontal(card) ? 'col-span-2' : 'col-span-1';
    const paddingBottom = isHorizontal(card)
      ? 'pb-[calc(63/88*100%)]'
      : 'pb-[calc(88/63*100%)]';
    const sizes = isHorizontal(card)
      ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 66vw'
      : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
    const url = `/sets/${set.set_code.toLowerCase()}/${card.set_index}`;

    return (
      <div key={`card-${card.id}`} className={`${colSpan}`}>
        <div className={`relative w-full ${paddingBottom}`}>
          <Link href={url}>
            <CldImage
              src={cardArtFilename}
              alt={card.full_card_name || 'Trading Card'}
              fill
              className="object-cover rounded-lg hover:cursor-pointer"
              sizes={sizes}
            />
          </Link>
          <AddButton
            cardId={card.id}
            checked={isCollected(card)}
            onToggle={handleToggle}
            onAnon={handleAnonClick}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
        {cards.map((card) => renderCard(card))}
      </div>
      {battlefields.length > 0 && (
        <>
          <div className="p-4 flex items-center text-sm before:flex-1 before:border-t before:border-foreground/25 before:me-6 after:flex-1 after:border-t after:border-foreground/25 after:ms-6">
            Battlefields
          </div>
          <div className="grid grid-cols-4 lg:grid-cols-8 gap-4">
            {battlefields.map((card) => renderCard(card))}
          </div>
        </>
      )}
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
        <p className="text-center text-muted-foreground/25 py-4">
          All cards in set loaded.
        </p>
      )}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Please Sign In</DialogTitle>
            <DialogDescription>
              Collection features are only enabled while logged in.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-row justify-center gap-4">
            <Button
              variant={'outline'}
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Ok
            </Button>
            <SignInButton>
              <Button className="bg-primary">Sign In</Button>
            </SignInButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
