import { Button } from '@/components/ui/button';

interface ActionRowProps {
  deckName: string;
  deckVisibility: 'public' | 'private';
  saveDeck: () => void;
  copyDeckLink: () => void;
}

export function ActionRow({
  deckName,
  saveDeck,
  copyDeckLink,
}: ActionRowProps) {
  return (
    <div className="flex items-center justify-end gap-4 pb-4 pr-4 pl-4">
      {/* Save Button */}
      {/* <Button
        onClick={saveDeck}
        variant="outline"
        className="px-4 py-2 rounded-md"
      >
        Save Deck
      </Button> */}
      {/* Copy Deck Button */}
      <Button
        onClick={copyDeckLink}
        variant="outline"
        className="px-4 py-2 rounded-md"
      >
        Copy Deck Link
      </Button>
    </div>
  );
}
