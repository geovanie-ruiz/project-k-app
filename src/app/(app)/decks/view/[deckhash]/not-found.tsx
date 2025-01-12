import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function DeckNotFound() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Deck Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The deck you're looking for doesn't exist or the URL is invalid.
        </p>
        <Button asChild>
          <Link href="/decks">Back to Decks</Link>
        </Button>
      </Card>
    </div>
  );
}
