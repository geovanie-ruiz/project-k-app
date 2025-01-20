import { MetaProps, PageMeta, generateMeta } from '@/utils/opengraph';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { SpoilerList } from './_components/SpoilerList';

export default async function Spoilers() {
  return (
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
      <div className="flex items-center justify-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
          Spoilers
        </h1>
      </div>
      <Suspense
        fallback={<div className="text-center">Loading spoilers...</div>}
      >
        <SpoilerList />
      </Suspense>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const pageMeta: PageMeta = {
    type: 'website',
    title: 'Spoilers',
    description: 'List of card spoilers for Project K.',
  };
  const metaProps: MetaProps = {
    page: pageMeta,
  };
  return generateMeta(metaProps);
}
