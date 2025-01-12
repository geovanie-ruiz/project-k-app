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
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <ul className="space-y-1">
        {cards.map(({ card, quantity }) => {
          const borderColor =
            card.rune && card.rune.length > 0
              ? (runeColors[card.rune[0]] ?? 'gray')
              : 'gray';
          return (
            <li
              key={`${(card.set as Set).set_code}-${card.set_index}`}
              className="flex justify-between items-center p-2 border rounded-lg cursor-pointer hover:bg-primary/10 h-9"
              onClick={() => removeCardFromDeck(card)}
              style={{ borderColor }}
            >
              <span>{card.name}</span>
              <span className="text-gray-500">x{quantity}</span>
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
