'use server';

import { selectClient } from '@/utils/supabase/selectClient';
import { SPOILERS_PER_PAGE } from '../_components/SpoilerList';
import { Spoiler } from '../_types/spoiler';

export async function fetchSpoilers(
  page: number = 1,
  pageSize: number = SPOILERS_PER_PAGE
): Promise<{ spoilers: Spoiler[]; hasMore: boolean }> {
  // Use the custom Supabase client you created
  const client = await selectClient();

  // Set up pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize - 1;

  const { data, count, error } = await client
    .from('spoiler')
    .select('*', { count: 'exact' })
    .order('published_on', { ascending: false })
    .order('description')
    .range(startIndex, endIndex);

  if (error) {
    if (error.code === 'PGRST103') {
      // this is safe to ignore; occurs when db isnt big enough
      // the range is bigger than the total number of records
    } else {
      throw error;
    }
  }

  return {
    spoilers: data || [],
    hasMore: !!count && endIndex < count,
  };
}
