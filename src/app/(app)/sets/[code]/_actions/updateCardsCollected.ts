import config from '@/payload.config';
import { partition } from '@/utils';
import { getPayload } from 'payload';

type CardCollected = {
  cardId: number;
  collected: boolean;
};
type UpdateProps = {
  owner: string;
  cardsCollected: CardCollected[];
};

export const updateCardsCollected = async ({
  owner,
  cardsCollected,
}: UpdateProps) => {
  const [additions, removals] = partition<CardCollected>(
    cardsCollected,
    (c) => c.collected
  );

  const payload = await getPayload({ config });
  const { docs: cardsAdded, errors: addedErrors } = await payload.update({
    collection: 'collection',
    where: {
      owner: {
        id: {
          equals: owner,
        },
      },
    },
    data: {},
  });

  return {
    added: {
      cards: cardsAdded,
      errors: addedErrors,
    },
    removed: {},
  };
};
