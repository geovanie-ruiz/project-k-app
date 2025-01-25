import { generateMeta, MetaProps, PageMeta } from '@/utils/opengraph';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { SetList } from './_components/SetList';

export default async function Sets() {
  return (
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
      <div className="flex items-center justify-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
          Sets
        </h1>
      </div>
      <Suspense fallback={<div className="text-center">Loading sets...</div>}>
        <SetList />
      </Suspense>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const pageMeta: PageMeta = {
    type: 'website',
    title: 'Sets',
    description: 'List of card sets for Project K',
  };
  const metaProps: MetaProps = {
    page: pageMeta,
  };
  return generateMeta(metaProps);
}
