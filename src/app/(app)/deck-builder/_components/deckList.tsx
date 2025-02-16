import { Card, Set } from '@/payload-types';
import { DeckListCard, EditDeckList } from '@/utils/cards';

interface DeckListProps {
  deck: EditDeckList;
  removeCardFromDeck: (card: Card) => void;
}

// TODO Improve this with the new style
const runeColors: Record<string, string> = {
  Calm: '#5ca15e',
  Chaos: '#7d6e8f',
  Fury: '#8c352c',
  Mental: '#5d6d91',
  Order: '#fcd55c',
  Physical: '#d89457',
};

export function DeckList({ deck, removeCardFromDeck }: DeckListProps) {
  const renderDeckSection = (title: string, cards: DeckListCard[]) => (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold mb-2">
        {title} - {cards.reduce((sum, { quantity }) => sum + quantity, 0)}
      </h3>
      <ul className="space-y-1">
        {cards.map(({ card, quantity }) => {
          // Generate the gradient
          const gradient =
            card.rune && card.rune.length > 0
              ? card.rune.length === 1
                ? (runeColors[card.rune[0]] ?? 'gray') // Single color
                : `linear-gradient(45deg, ${card.rune
                    .slice(0, 2) // Take at most 2 runes
                    .map((r) => runeColors[r] ?? 'gray')
                    .join(', ')})` // Gradient for multiple runes
              : 'gray';

          return (
            <li
              key={`${(card.set as Set).set_code}-${card.set_index}`}
              className="relative flex justify-between items-center p-2 rounded-lg cursor-pointer hover:bg-primary/10 h-9"
              onClick={() => removeCardFromDeck(card)}
            >
              <span>{card.name}</span>
              <span>x{quantity}</span>
              {/* Gradient Border */}
              <div
                className="absolute inset-0 -z-10 rounded-lg"
                style={{
                  background: gradient,
                  maskImage:
                    'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                  WebkitMaskImage:
                    'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                  maskComposite: 'exclude',
                  WebkitMaskComposite: 'exclude',
                  padding: '2px',
                }}
              ></div>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-13rem)] pr-2">
      {renderDeckSection('Legend', deck.legend)}
      {renderDeckSection('Battlefields', deck.battlefields)}
      {renderDeckSection('Main Deck', deck.mainDeck)}
      {renderDeckSection('Rune Deck', deck.runeDeck)}
    </div>
  );
}
