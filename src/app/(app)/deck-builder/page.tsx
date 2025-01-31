'use client';

import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Set, Card as TCGCard } from '@/payload-types';
import { EditDeckList } from '@/utils/cards';
import LZString from 'lz-string';
import { Suspense, useState } from 'react';
import { CardsList } from './_components/cardsList';
import { ActionRow } from './_components/deckActions';
import { DeckList } from './_components/deckList';
import {
  FiltersComponent,
  Filters as FiltersType,
} from './_components/filters';

function DeckBuilderSkeleton() {
  return (
    <div className="grid h-[calc(100vh-12rem)] grid-cols-1 lg:grid-cols-[320px_1fr_400px] gap-6">
      <Skeleton className="w-full h-full" />
      <Skeleton className="w-full h-full" />
      <Skeleton className="w-full h-full" />
    </div>
  );
}

function CardsListSkeleton() {
  return <div></div>;
}

export default function DeckBuilderPage() {
  const [deck, setDeck] = useState<EditDeckList>({
    legend: [],
    battlefields: [],
    runeDeck: [],
    mainDeck: [],
    deckName: '',
    deckVisibility: 'public',
  });
  const [filters, setFilters] = useState<FiltersType>({
    runeFilters: [],
    cardTypeFilters: [],
    mightFilters: [],
    costFilters: [],
    runeCostFilters: [],
  });

  const toggleRuneFilter = (filter: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      runeFilters: prevFilters.runeFilters.includes(filter)
        ? prevFilters.runeFilters.filter((f) => f !== filter)
        : [...prevFilters.runeFilters, filter],
    }));
  };

  const clearAllCardTypes = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      cardTypeFilters: [],
    }));
  };

  const toggleCardType = (filter: string) => {
    setFilters((prev) => ({
      ...prev,
      cardTypeFilters: prev.cardTypeFilters.includes(filter)
        ? prev.cardTypeFilters.filter((f) => f !== filter)
        : [...prev.cardTypeFilters, filter],
    }));
  };

  const toggleMightFilter = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      mightFilters: prev.mightFilters.includes(value)
        ? prev.mightFilters.filter((f) => f !== value)
        : [...prev.mightFilters, value],
    }));
  };

  const toggleCostFilter = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      costFilters: prev.costFilters.includes(value)
        ? prev.costFilters.filter((f) => f !== value)
        : [...prev.costFilters, value],
    }));
  };

  const toggleRuneCostFilter = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      runeCostFilters: prev.runeCostFilters.includes(value)
        ? prev.runeCostFilters.filter((f) => f !== value)
        : [...prev.runeCostFilters, value],
    }));
  };

  const addCardToDeck = (card: TCGCard) => {
    setDeck((prevDeck) => {
      const targetSection =
        card.type === 'Legend'
          ? 'legend'
          : card.type === 'Battlefield'
            ? 'battlefields'
            : card.type === 'Rune'
              ? 'runeDeck'
              : 'mainDeck';

      const section = prevDeck[targetSection];
      const existingCard = section.find(
        (c) =>
          `${(c.card.set as Set).set_code}-${c.card.set_index}` ===
          `${(card.set as Set).set_code}-${card.set_index}`
      );

      // Define capacity rules
      const capacityRules = {
        legend: { maxCards: 1, maxCopies: 1 },
        battlefields: { maxCards: 3, maxCopies: 1 },
        mainDeck: { maxCards: 40, maxCopies: 3 },
        runeDeck: { maxCards: 12, maxCopies: Infinity },
      };

      const { maxCards, maxCopies } = capacityRules[targetSection];

      // Calculate total card count in the section
      const totalCardCount = section.reduce((sum, c) => sum + c.quantity, 0);

      // Check maximum capacity for the section
      if (totalCardCount >= maxCards) {
        return prevDeck; // Return unchanged deck
      }

      // Check maximum copies of a card
      if (existingCard && existingCard.quantity >= maxCopies) {
        return prevDeck; // Return unchanged deck
      }

      // Add or update the card in the section
      if (existingCard) {
        // Increment quantity if card already exists
        return {
          ...prevDeck,
          [targetSection]: section.map((c) =>
            `${(c.card.set as Set).set_code}-${c.card.set_index}` ===
            `${(card.set as Set).set_code}-${card.set_index}`
              ? { ...c, quantity: c.quantity + 1 }
              : c
          ),
        };
      } else {
        // Add card if it doesn't exist
        return {
          ...prevDeck,
          [targetSection]: [...section, { card, quantity: 1 }],
        };
      }
    });
  };

  const removeCardFromDeck = (card: TCGCard) => {
    setDeck((prevDeck) => {
      const targetSection =
        card.type === 'Legend'
          ? 'legend'
          : card.type === 'Battlefield'
            ? 'battlefields'
            : card.type === 'Rune'
              ? 'runeDeck'
              : 'mainDeck';

      const section = prevDeck[targetSection];
      const existingCard = section.find(
        (c) =>
          `${(c.card.set as Set).set_code}-${c.card.set_index}` ===
          `${(card.set as Set).set_code}-${card.set_index}`
      );

      if (existingCard && existingCard.quantity > 1) {
        // Decrease quantity if more than 1
        return {
          ...prevDeck,
          [targetSection]: section.map((c) =>
            `${(c.card.set as Set).set_code}-${c.card.set_index}` ===
            `${(card.set as Set).set_code}-${card.set_index}`
              ? { ...c, quantity: c.quantity - 1 }
              : c
          ),
        };
      } else {
        // Remove card if quantity is 1
        return {
          ...prevDeck,
          [targetSection]: section.filter(
            (c) =>
              `${(c.card.set as Set).set_code}-${c.card.set_index}` !==
              `${(card.set as Set).set_code}-${card.set_index}`
          ),
        };
      }
    });
  };

  const saveDeck = () => {
    // TODO we disable this while deckbuilding is only public
    // if (!deck.deckName.trim()) {
    //   alert('Please enter a deck name.');
    //   return;
    // }

    // TODO mock save logic (replace with actual API call)
    console.log('Saving deck...', {
      deckName: deck.deckName,
      deckVisibility: deck.deckVisibility,
      legend: deck.legend,
      battlefields: deck.battlefields,
      runeDeck: deck.runeDeck,
      mainDeck: deck.mainDeck,
    });
  };

  const copyDeckLink = () => {
    // Serialize and encode the deck
    const compactDeck = {
      l: deck.legend.map(
        (c) =>
          `${(c.card.set as Set).set_code}-${c.card.set_index};${c.quantity}`
      ),
      b: deck.battlefields.map(
        (c) =>
          `${(c.card.set as Set).set_code}-${c.card.set_index};${c.quantity}`
      ),
      r: deck.runeDeck.map(
        (c) =>
          `${(c.card.set as Set).set_code}-${c.card.set_index};${c.quantity}`
      ),
      m: deck.mainDeck.map(
        (c) =>
          `${(c.card.set as Set).set_code}-${c.card.set_index};${c.quantity}`
      ),
    };
    console.log('Compact deck:', compactDeck);
    const compressed = LZString.compressToEncodedURIComponent(
      JSON.stringify(compactDeck)
    );
    const shareLink = `${window.location.origin}/decks/view/${compressed}`;
    navigator.clipboard.writeText(shareLink);
  };

  return (
    <div className="mx-auto w-full max-w-screen-2xl">
      <Suspense fallback={<DeckBuilderSkeleton />}>
        <div className="grid h-[calc(100vh-7rem)] mb-4 grid-cols-1 lg:grid-cols-[320px_1fr_400px] gap-6">
          {/* Filters Section */}
          <Card className="p-4 pb-2">
            <ScrollArea className="h-full">
              <div className="pr-4 pl-4">
                <FiltersComponent
                  filters={filters}
                  toggleRuneFilter={toggleRuneFilter}
                  toggleCardType={toggleCardType}
                  toggleMightFilter={toggleMightFilter}
                  toggleCostFilter={toggleCostFilter}
                  toggleRuneCostFilter={toggleRuneCostFilter}
                  clearAllCardTypes={clearAllCardTypes}
                />
              </div>
            </ScrollArea>
          </Card>

          {/* Available Cards Section */}
          <Card className="pt-4 pb-2">
            <ScrollArea className="h-full">
              <div className="pr-4 pl-4">
                <Suspense fallback={<CardsListSkeleton />}>
                  <CardsList filters={filters} addCardToDeck={addCardToDeck} />
                </Suspense>
              </div>
            </ScrollArea>
          </Card>

          {/* Deck Section */}
          <Card className="flex flex-col h-full">
            {/* Deck List */}
            <div className="flex-grow overflow-y-auto">
              <ScrollArea className="h-full pt-2">
                <div className="pr-2 pl-4">
                  <DeckList
                    deck={deck}
                    removeCardFromDeck={removeCardFromDeck}
                  />
                </div>
              </ScrollArea>
            </div>

            {/* Action Row */}
            <div className="flex-none">
              <ActionRow
                deckVisibility={deck.deckVisibility}
                deckName={deck.deckName}
                saveDeck={saveDeck}
                copyDeckLink={copyDeckLink}
              />
            </div>
          </Card>
        </div>
      </Suspense>
    </div>
  );
}
