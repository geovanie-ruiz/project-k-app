'use server';

import { Set } from '@/payload-types';
import config from '@/payload.config';
import { getPayload } from 'payload';
import { SETS_PER_PAGE } from '../_components/SetList';

export async function fetchSets(
  page: number = 1,
  pageSize: number = SETS_PER_PAGE
): Promise<{ sets: Set[]; hasMore: boolean }> {
  const payload = await getPayload({ config });

  const sets = await payload.find({
    collection: 'sets',
    sort: ['-releasedAt', 'name'],
    limit: pageSize,
    page: page,
    depth: 2,
  });

  return {
    sets: sets.docs,
    hasMore: sets.hasNextPage,
  };
}
