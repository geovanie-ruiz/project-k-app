'use server';

import { Spoiler } from '@/payload-types';
import config from '@/payload.config';
import { getPayload } from 'payload';
import { SPOILERS_PER_PAGE } from '../_components/SpoilerList';

export async function fetchSpoilers(
  page: number = 1,
  pageSize: number = SPOILERS_PER_PAGE
): Promise<{ spoilers: Spoiler[]; hasMore: boolean }> {
  const payload = await getPayload({ config });

  const spoilers = await payload.find({
    collection: 'spoilers',
    sort: ['-createdAt', 'title'],
    limit: pageSize,
    page: page,
    depth: 2,
  });

  return {
    spoilers: spoilers.docs,
    hasMore: spoilers.hasNextPage,
  };
}
