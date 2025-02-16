'use server';

import config from '@/payload.config';
import { getPayload } from 'payload';
import { CARDS_PER_PAGE } from '../_components/SetCardList';

import { Card, CardsVariant } from '@/payload-types';
import { getUser } from '@/utils/user';

export type QueryProps = {
  page: number;
  pageSize: number;
  setId: number;
};

export type CardsCollected = {
  setIndex: number;
  collected: boolean;
  isBattlefield: boolean;
};

export const queryCardsBySet = async ({
  setId,
  page = 1,
  pageSize = CARDS_PER_PAGE,
}: QueryProps) => {
  const payload = await getPayload({ config });
  const userId = await getUser(payload);

  const cards = await payload.find({
    collection: 'cards',
    where: {
      set: {
        equals: setId,
      },
    },
    joins: {
      variants: {
        where: {
          defaultVariant: {
            equals: true,
          },
        },
        limit: 1,
      },
    },
    sort: ['set_index'],
    limit: pageSize,
    page: page,
    depth: 2,
  });

  let collected: CardsCollected[] = [];

  if (userId) {
    const cardsVariantsCollected = await payload.find({
      collection: 'cards-variants-collected',
      select: {
        quantity: true,
        variant: true,
      },
      where: {
        and: [
          {
            'variant.card.set': {
              equals: setId,
            },
          },
          {
            user: {
              equals: userId,
            },
          },
        ],
      },
      sort: ['variant.card.set_index'],
      limit: pageSize,
      page: page,
      depth: 2,
    });

    collected = cardsVariantsCollected.docs.map((collected) => {
      const card = (collected.variant as CardsVariant).card as Card;
      return {
        setIndex: card.set_index,
        collected: !!collected?.quantity && collected.quantity > 0,
        isBattlefield: card.type === 'Battlefield',
      };
    });
  }

  return {
    cards: cards.docs,
    collected: collected,
    hasMore: cards.hasNextPage,
  };
};
