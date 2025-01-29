'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { searchContent, type SearchResult } from '@/utils/search';
import { Search as SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { startTransition, useActionState, useEffect, useState } from 'react';

import { useDebouncedCallback } from 'use-debounce';

type SearchResultsProps = {
  results: SearchResult[];
  onClose: () => void;
  searching: boolean;
};

const SearchResults = ({ results, onClose, searching }: SearchResultsProps) => (
  <div className="space-y-4 max-h-[60vh] overflow-y-auto">
    {searching && results.length === 0 && <p>No results found.</p>}
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
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [state, action, isPending] = useActionState<SearchResult[], string>(
    searchContent,
    []
  );

  const handleInputChange = useDebouncedCallback((term: string) => {
    setIsSearching(term !== '' && term.length >= 2);
    startTransition(() => {
      action(term);
    });
  }, 700);

  const handleClose = () => {
    startTransition(() => {
      action('');
    });
    setIsSearching(false);
    setIsOpen(false);
  };

  useEffect(() => {
    if (state.length === 0 && isPending) {
      setShowResults(false);
    } else {
      setShowResults(true);
    }
  }, [state, isPending]);

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
          <DialogTitle>Search 2Runes.gg</DialogTitle>
          <DialogDescription>
            Search cards, decks, and articles across the site.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            type="search"
            placeholder="Search cards, decks and articles..."
            onChange={(e) => handleInputChange(e.target.value)}
          />
          {isPending && isSearching && <p>Searching...</p>}
          {showResults && (
            <SearchResults
              results={state}
              onClose={handleClose}
              searching={isSearching}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
