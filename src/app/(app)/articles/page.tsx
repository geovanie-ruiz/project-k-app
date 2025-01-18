import { Suspense } from 'react';
import { ArticleList } from './_components/ArticleList';

export default async function Spoilers() {
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
