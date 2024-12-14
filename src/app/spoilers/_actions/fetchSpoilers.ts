'use server';

import { createClerkSupabaseClientSsr } from '@/app/ssr/client';
import { Spoiler } from '@/lib/database.types';

export async function fetchSpoilers(
  page: number = 1,
  pageSize: number = 6
): Promise<{ spoilers: Spoiler[]; hasMore: boolean }> {
  // Use the custom Supabase client you created
  const client = await createClerkSupabaseClientSsr();

  // Set up pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize - 1;

  // Query the 'tasks' table to render the list of tasks
  const { data, count, error } = await client
    .from('spoiler')
    .select('*', { count: 'exact' })
    .order('published_on', { ascending: false })
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
