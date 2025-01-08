import { notFound } from 'next/navigation';
import { getPayload } from 'payload';

import type { Article as ArticleType } from '@/payload-types';

import config from '@/payload.config';
import { RefreshRouteOnSave } from './RefreshRouteOnSave';

import RichText from '@/components/custom/richText';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { ArticleHero } from './_components/hero';

export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const articles = await payload.find({
    collection: 'articles',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  });

  const params = articles.docs.map(({ slug }) => {
    return { slug };
  });

  return params;
}

type ArticleViewProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview: boolean }>;
};

export default async function ArticleView({
  params,
  searchParams,
}: ArticleViewProps) {
  const { slug = '' } = await params;
  const { preview } = await searchParams;

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
    <article>
      <RefreshRouteOnSave />

      <ArticleHero article={data} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <RichText
            className="max-w-[48rem] mx-auto"
            data={articleContent}
            enableGutter={false}
          />

          {/* {post.relatedPosts && post.relatedPosts.length > 0 && (
            <RelatedPosts
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={post.relatedPosts.filter(
                (post) => typeof post === 'object'
              )}
            />
          )} */}
        </div>
      </div>
    </article>
  );
}
