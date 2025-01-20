import { Database } from '@/utils/types/database.types';
import { createClient } from '@supabase/supabase-js';

// initial implementation

type TradingCard = Database['public']['Tables']['cards']['Row'];

export type CardSearchResult = {
  cards: TradingCard[] | null;
};

export const searchCardName = async (
  name: string
): Promise<CardSearchResult> => {
  const client = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const nameParts = name.split(' ').map((part) => `'${part}'`);
  const nameSearch = nameParts.join(' & ');

  const { data } = await client
    .from('cards')
    .select('*')
    .textSearch('card_name_vector', nameSearch);

  return {
    cards: data,
  };
};

export const searchCardText = async (
  term: string
): Promise<CardSearchResult> => {
  const client = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const termParts = term.split(' ').map((part) => `'${part}'`);
  const termSearch = termParts.join(' & ');

  const { data } = await client
    .from('cards')
    .select('*')
    .textSearch('card_text_vector', termSearch);

  return {
    cards: data,
  };
};

export const searchCardNameText = async (
  term: string
): Promise<CardSearchResult> => {
  const client = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const termParts = term.split(' ').map((part) => `'${part}'`);
  const termSearch = termParts.join(' & ');

  const { data } = await client
    .from('cards')
    .select('*')
    .textSearch('card_name_text_vector', termSearch);

  return {
    cards: data,
  };
};
