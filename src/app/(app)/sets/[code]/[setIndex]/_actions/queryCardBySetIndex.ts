import config from '@/payload.config';
import { getPayload } from 'payload';

export const queryCardBySetIndex = async ({
  setCode,
  setIndex,
}: {
  setCode: string;
  setIndex: number;
}) => {
  const payload = await getPayload({ config });
  const cards = await payload.find({
    collection: 'cards',
    where: {
      'set.set_code': {
        equals: setCode,
      },
      set_index: {
        equals: setIndex,
      },
    },
    limit: 1,
  });

  return cards.docs.length > 0 ? cards.docs[0] : null;
};
