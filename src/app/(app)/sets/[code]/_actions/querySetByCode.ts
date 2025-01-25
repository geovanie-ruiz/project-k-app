import config from '@/payload.config';
import { getPayload } from 'payload';

export const querySetByCode = async ({ code }: { code: string }) => {
  const payload = await getPayload({ config });
  const sets = await payload.find({
    collection: 'sets',
    where: {
      set_code: {
        equals: code,
      },
    },
    limit: 1,
  });

  return sets.docs.length > 0 ? sets.docs[0] : null;
};
