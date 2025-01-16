import { Card } from '@/components/ui/card';
import { EditDeckList } from '@/utils/cards';
import LZString from 'lz-string';
import { notFound } from 'next/navigation';
import { DeckViewer } from './_components/deck-viewer';

interface DeckViewPageProps {
  params: Promise<{ deckhash: string }>;
}

async function getDeckFromHash(hash: string): Promise<EditDeckList> {
  try {
    // Decode the URL-encoded hash
    const decodedHash = decodeURIComponent(hash);
    const decompressed =
      LZString.decompressFromEncodedURIComponent(decodedHash);
    if (!decompressed) {
      throw new Error('Invalid deck hash');
    }

    console.log('Decompressed:', decompressed);
    // TODO - Validate the deck structure
    const deck = JSON.parse(decompressed) as EditDeckList;

    // Ensure all required properties exist
    return {
      legend: deck.legend || [],
      battlefields: deck.battlefields || [],
      mainDeck: deck.mainDeck || [],
      runeDeck: deck.runeDeck || [],
      deckName: deck.deckName || 'Untitled Deck',
      deckVisibility: deck.deckVisibility || 'public',
    };
  } catch (error) {
    console.error('Error parsing deck hash:', error);
    throw error;
  }
}

export default async function DeckViewPage({ params }: DeckViewPageProps) {
  let deck: EditDeckList;

  try {
    const { deckhash } = await params;
    deck = await getDeckFromHash(deckhash);
  } catch (error) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Shared Deck</h1>
        <DeckViewer deck={deck} />
      </Card>
    </div>
  );
}
