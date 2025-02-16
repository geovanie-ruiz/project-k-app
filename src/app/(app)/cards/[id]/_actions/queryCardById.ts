import config from '@/payload.config';
import { getPayload } from 'payload';

export const queryCardById = async ({ id }: { id: number }) => {
  const payload = await getPayload({ config });
  return await payload.findByID({
    collection: 'cards',
    id: id,
    joins: {
      variants: {
        sort: 'rarity',
      },
    },
    depth: 2,
  });
};
