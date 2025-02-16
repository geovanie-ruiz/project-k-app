'use server';

import { Card } from '@/payload-types';
import config from '@/payload.config';
import { getPayload } from 'payload';

export async function fetchCards(
  page: number = 1,
  pageSize: number = 10
): Promise<{ cards: Card[]; hasMore: boolean }> {
  const payload = await getPayload({ config });

  const cards = await payload.find({
    collection: 'cards',
    sort: ['set', 'set_index'],
    limit: pageSize,
    page: page,
    depth: 2,
  });

  return {
    // cards: cards.docs,
    cards: cards.docs,
    hasMore: cards.hasNextPage,
  };
}
