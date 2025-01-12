'use server';

import { Card } from '@/payload-types';
import config from '@/payload.config';
import { getPayload } from 'payload';

export async function fetchCards(
): Promise<{ cards: Card[]; hasMore: boolean }> {
  const payload = await getPayload({ config });

  const cards = await payload.find({
    collection: 'cards',
    sort: ['set', 'set_index'],
    depth: 2,
  });

  console.log(cards.docs[0]);

  return {
    // cards: cards.docs,
    cards: Array(60).fill(null).map((_, index) => ({
      ...cards.docs[0],
      set_index: index,
      name: `${cards.docs[0].name} ${index}`,
    })),
    hasMore: cards.hasNextPage,
  };
}
