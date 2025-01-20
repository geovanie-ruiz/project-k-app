import { generateMeta, MetaProps, PageMeta } from '@/utils/opengraph';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { ArticleList } from './_components/ArticleList';

export default async function Articles() {
  return (
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
      <div className="flex items-center justify-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
          Articles
        </h1>
      </div>
      <Suspense
        fallback={<div className="text-center">Loading articles...</div>}
      >
        <ArticleList />
      </Suspense>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const pageMeta: PageMeta = {
    type: 'website',
    title: 'Articles',
    description: 'List of articles published on 2Runes.gg',
  };
  const metaProps: MetaProps = {
    page: pageMeta,
  };
  return generateMeta(metaProps);
}
