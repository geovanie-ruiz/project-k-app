import { Article } from '@/payload-types';
import { kebabIt } from '@/utils';
import type { CollectionBeforeChangeHook } from 'payload';

const slugNumber = [
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Eleven',
  'Twelve',
  'Thirteen',
  'Fourteen',
  'Fifteen',
  'Sixteen',
  'Seventeen',
  'Eighteen',
  'Nineteen',
  'Twenty',
];

export const formatSlug: CollectionBeforeChangeHook<Article> = async ({
  data,
  operation,
  req,
}) => {
  if (operation === 'create' || (data.title ?? '') === '') return data;
  if (data.slug) return data;

  let newSlug = kebabIt({ toSkewer: data.title! });

  const matchingArticleSlugs = await req.payload.count({
    collection: 'articles',
    where: {
      slug: {
        equals: newSlug,
      },
    },
  });

  if (matchingArticleSlugs.totalDocs > 0) {
    const slugDupeIdSuffix = slugNumber[matchingArticleSlugs.totalDocs];
    newSlug = `${newSlug}-${slugDupeIdSuffix}`;
  }

  return {
    ...data,
    slug: newSlug,
  };
};
