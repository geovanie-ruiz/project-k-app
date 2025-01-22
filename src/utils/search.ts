import { Database } from '@/utils/types/database.types';
import { createBrowserAnonClient } from './supabase/browserAnonClient';

type TradingCard = Database['public']['Tables']['cards']['Row'];
type SearchCardsProps = {
  term: string;
  mode: SearchMode;
};

export enum SearchMode {
  cardName = 'card_name_vector',
  cardText = 'card_text_vector',
  cardFull = 'card_name_text_vector',
}

export type CardSearchResult = {
  cards: TradingCard[] | null;
};

export const searchCards = async ({ term, mode }: SearchCardsProps) => {
  const client = createBrowserAnonClient();

  const termParts = term.split(' ').map((part) => `'${part}'`);
  const termSearch = termParts.join(' & ');

  const { data } = await client
    .from('cards')
    .select('*')
    .textSearch(mode, termSearch);

  return {
    cards: data,
  };
};

export type SearchResult = {
  id: string;
  type: 'articles' | 'cards' | 'decks';
  title: string;
  excerpt: string;
};

export const searchContent = async (
  prevState: SearchResult[],
  term: string
): Promise<SearchResult[]> => {
  if (term.trim() === '') return [];

  const client = createBrowserAnonClient();

  const termParts = term
    .split(' ')
    .filter((part) => part !== '')
    .map((part) => `${part}:*`);
  const termSearch = termParts.join(' & ');

  try {
    const { data: cards, error: cardsError } = await client
      .from('cards')
      .select(`id, full_card_name, abilities_text, set_index`)
      .textSearch(SearchMode.cardFull, termSearch);

    if (cardsError) {
      console.error('Error fetching cards:', cardsError);
      return prevState;
    }

    const { data: articles, error: articlesError } = await client
      .from('articles')
      .select('slug, title, excerpt')
      .eq('_status', 'published')
      .textSearch('article_search_vector', termSearch);

    if (articlesError) {
      console.error('Error fetching articles:', articlesError);
      return prevState;
    }

    const { data: decks, error: decksError } = await client
      .from('decks')
      .select('slug, name, preview')
      .eq('public', true)
      .textSearch('deck_name_vector', termSearch);

    if (decksError) {
      console.error('Error fetching decks:', decksError);
      return prevState;
    }

    const cardResult =
      cards?.map(
        (card): SearchResult => ({
          id: card.id.toString(),
          type: 'cards',
          title: card.full_card_name || 'Unknown Card',
          excerpt: card.abilities_text || 'This card has no ability text.',
        })
      ) || [];

    const articleResult =
      articles?.map(
        (article): SearchResult => ({
          id: article.slug || 'unknown-article',
          type: 'articles',
          title: article.title || 'Untitled Article',
          excerpt: article.excerpt || 'No excerpt available.',
        })
      ) || [];

    const deckResult =
      decks?.map(
        (deck): SearchResult => ({
          id: deck.slug || 'unknown-deck',
          type: 'decks',
          title: deck.name || 'Unnamed Deck',
          excerpt: deck.preview || 'This deck has no preview.',
        })
      ) || [];

    return [...cardResult, ...deckResult, ...articleResult];
  } catch (error) {
    console.error('Error during search:', error);
    return prevState;
  }
};
