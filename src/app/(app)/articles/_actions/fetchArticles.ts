'use server';

import { Article } from '@/payload-types';
import config from '@/payload.config';
import { getPayload } from 'payload';
import { ARTICLES_PER_PAGE } from '../_components/ArticleList';

export async function fetchArticles(
  page: number = 1,
  pageSize: number = ARTICLES_PER_PAGE
): Promise<{ articles: Article[]; hasMore: boolean }> {
  const payload = await getPayload({ config });

  const articles = await payload.find({
    collection: 'articles',
    sort: ['-publishedAt', 'title'],
    limit: pageSize,
    page: page,
    depth: 2,
  });

  return {
    articles: articles.docs,
    hasMore: articles.hasNextPage,
  };
}
