import { Article } from '@/payload-types';
import type { CollectionBeforeChangeHook } from 'payload';

const stopWords = [
  'the',
  'a',
  'an',
  'and',
  'or',
  'but',
  'in',
  'on',
  'at',
  'of',
  'for',
  'to',
  'with',
];
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

  let newSlug = '';
  const words = data
    .title!.toLowerCase()
    .replaceAll('-', ' ')
    .replaceAll("'", '')
    .replace(/[0-9&\/\\#,+()$~%.":*!?<>{}]/g, ' ')
    .split(' ')
    .filter((word) => word !== '');

  if (words.length > 5) {
    // filter stop words if the slug is getting long
    newSlug = words.filter((word) => !stopWords.includes(word)).join('-');
  } else {
    newSlug = words.join('-');
  }

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
