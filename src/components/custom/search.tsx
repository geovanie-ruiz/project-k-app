'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { searchContent, type SearchResult } from '@/utils/search';
import { Search as SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { startTransition, useActionState, useState } from 'react';

import { useDebouncedCallback } from 'use-debounce';

type SearchResultsProps = {
  results: SearchResult[];
  onClose: () => void;
  searchStarted: boolean;
};

const SearchResults = ({
  results,
  onClose,
  searchStarted,
}: SearchResultsProps) => (
  <div className="space-y-4 max-h-[60vh] overflow-y-auto">
    {searchStarted && results.length === 0 && <p>No results found.</p>}
    {results.length > 0 &&
      results.map((item) => (
        <div key={item.id} className="border-b pb-2">
          <Link
            href={`/${item.type}/${item.id}`}
            onClick={onClose}
            className="block hover:underline"
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
          </Link>
          <p className="text-sm text-muted-foreground">{item.excerpt}</p>
          <span className="text-xs text-muted-foreground capitalize">
            {item.type}
          </span>
        </div>
      ))}
  </div>
);

export const Search: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchStarted, setSearchStarted] = useState(false);
  const [state, action, isPending] = useActionState<SearchResult[], string>(
    searchContent,
    []
  );

  const handleInputChange = useDebouncedCallback((term: string) => {
    setSearchStarted(term !== '');
    startTransition(() => {
      action(term);
    });
  }, 700);

  const handleClose = () => {
    startTransition(() => {
      action('');
    });
    setSearchStarted(false);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto">
          <SearchIcon className="h-4 w-4 mr-2" />
          Search
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Site Search</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            type="search"
            placeholder="Search cards, decks and articles..."
            onChange={(e) => handleInputChange(e.target.value)}
          />
          {isPending && <p>Searching...</p>}
          {state && (
            <SearchResults
              results={state}
              onClose={handleClose}
              searchStarted={searchStarted}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
