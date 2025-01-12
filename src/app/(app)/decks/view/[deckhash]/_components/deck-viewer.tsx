'use client';

import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EditDeckList } from '@/utils/cards';

interface DeckViewerProps {
  deck: EditDeckList;
}

export function DeckViewer({ deck }: DeckViewerProps) {
  // Ensure we have arrays even if they're undefined
  const legend = deck?.legend || [];
  const battlefields = deck?.battlefields || [];
  const mainDeck = deck?.mainDeck || [];
  const runeDeck = deck?.runeDeck || [];

  const totalCards =
    legend.length + battlefields.length + mainDeck.length + runeDeck.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {totalCards} cards total
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Legend Section */}
        <Card className="p-4">
          <h2 className="font-semibold mb-2">Legend ({legend.length})</h2>
          <ScrollArea className="h-[200px]">
            <div className="space-y-1">
              {legend.map((card) => (
                <div
                  key={card.card.id}
                  className="flex items-center justify-between"
                >
                  <span>{card.card.name}</span>
                  <span className="text-muted-foreground">
                    {card.quantity}x
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Battlefields Section */}
        <Card className="p-4">
          <h2 className="font-semibold mb-2">
            Battlefields ({battlefields.length})
          </h2>
          <ScrollArea className="h-[200px]">
            <div className="space-y-1">
              {battlefields.map((card) => (
                <div
                  key={card.card.id}
                  className="flex items-center justify-between"
                >
                  <span>{card.card.name}</span>
                  <span className="text-muted-foreground">
                    {card.quantity}x
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Main Deck Section */}
        <Card className="p-4 md:col-span-2">
          <h2 className="font-semibold mb-2">Main Deck ({mainDeck.length})</h2>
          <ScrollArea className="h-[300px]">
            <div className="space-y-1">
              {mainDeck.map((card) => (
                <div
                  key={card.card.id}
                  className="flex items-center justify-between"
                >
                  <span>{card.card.name}</span>
                  <span className="text-muted-foreground">
                    {card.quantity}x
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Rune Deck Section */}
        <Card className="p-4 md:col-span-2">
          <h2 className="font-semibold mb-2">Rune Deck ({runeDeck.length})</h2>
          <ScrollArea className="h-[200px]">
            <div className="space-y-1">
              {runeDeck.map((card) => (
                <div
                  key={card.card.id}
                  className="flex items-center justify-between"
                >
                  <span>{card.card.name}</span>
                  <span className="text-muted-foreground">
                    {card.quantity}x
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}
