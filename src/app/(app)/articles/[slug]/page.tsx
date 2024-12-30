import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import { Fragment } from 'react';

import type { Article as ArticleType } from '@/payload-types';

import config from '@/payload.config';
import { RefreshRouteOnSave } from './RefreshRouteOnSave';

import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { RichText } from '@payloadcms/richtext-lexical/react';

type ArticleViewProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview: boolean }>;
};

export default async function ArticleView({
  params,
  searchParams,
}: ArticleViewProps) {
  const slug = (await params).slug;
  const preview = (await searchParams).preview;
  const payload = await getPayload({ config });
  const article = await payload.find({
    collection: 'articles',
    draft: preview,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (article.totalDocs === 0) return notFound();

  const data = article.docs?.[0] as ArticleType;
  const articleContent = data.content as SerializedEditorState;

  return (
    <Fragment>
      <RefreshRouteOnSave />
      <div>
        <RichText data={articleContent} />
      </div>
    </Fragment>
  );
}
