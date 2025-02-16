'use server';

import config from '@/payload.config';
import { getUser } from '@/utils/user';
import { getPayload } from 'payload';

export const querySetByCode = async ({ code }: { code: string }) => {
  const payload = await getPayload({ config });
  const userId = await getUser(payload);

  const sets = await payload.find({
    collection: 'sets',
    where: {
      set_code: {
        equals: code,
      },
    },
    limit: 1,
  });

  const set = sets.docs.length > 0 ? sets.docs[0] : null;
  let collected = 0;

  if (userId && set) {
    const collectedCount = await payload.count({
      collection: 'cards-variants-collected',
      where: {
        and: [
          {
            'variant.defaultVariant': {
              equals: true,
            },
          },
          {
            'variant.card.set': {
              equals: set.id,
            },
          },
          {
            user: {
              equals: userId,
            },
          },
        ],
      },
    });

    collected = collectedCount.totalDocs;
  }

  return {
    set,
    collected,
  };
};
