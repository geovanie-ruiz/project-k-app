import { Suspense } from 'react';
import { fetchSpoilers } from './_actions/fetchSpoilers';
import SpoilerList from './_components/SpoilerList';

export default async function Spoilers() {
  const { spoilers } = await fetchSpoilers(1, 6);

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Spoilers</h1>
      <Suspense
        fallback={<div className="text-center">Loading spoilers...</div>}
      >
        <SpoilerList initialSpoilers={spoilers} />
      </Suspense>
    </>
  );
}
