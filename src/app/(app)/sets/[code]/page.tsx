import { notFound } from 'next/navigation';
import { getPayload } from 'payload';

import type { Media } from '@/payload-types';

import config from '@/payload.config';

import { Metadata } from 'next';

import { showDateTitle } from '@/utils';
import { generateMeta, PageMeta } from '@/utils/opengraph';
import { Suspense } from 'react';
import { querySetByCode } from './_actions/querySetByCode';
import { HeroProps, SetHero } from './_components/hero';
import { SetCardList } from './_components/SetCardList';

export type SetViewProps = {
  params: Promise<{ code: string }>;
};

export default async function SetView({ params }: SetViewProps) {
  const { code = '' } = await params;

  const { set, collected } = await querySetByCode({ code });
  if (!set) return notFound();

  const heroProps: HeroProps = {
    name: set.name,
    description: set.description || '',
    setCode: set.set_code,
    cardTotal: set.total,
    releaseDate: set.releasedAt || '',
    heroImage: set.key_art as Media,
    collected,
  };

  return (
    <article id={`set-${set.id}`}>
      <div className="mx-auto w-full max-w-screen-xl">
        <SetHero {...heroProps} />

        <Suspense fallback={<div className="text-center">Loading sets...</div>}>
          <SetCardList set={set} />
        </Suspense>
      </div>
    </article>
  );
}

const getPublicId = async (
  keyArt: number | Media | undefined | null
): Promise<string> => {
  if (!keyArt) return 'cardback-blue';
  if (!keyArt || typeof keyArt === 'number') {
    const payload = await getPayload({ config });
    const image = await payload.findByID({
      collection: 'media',
      id: keyArt,
    });
    return image.filename!;
  }
  return keyArt.filename!;
};

export async function generateMetadata({
  params,
}: SetViewProps): Promise<Metadata> {
  const { code = '' } = await params;

  const { set } = await querySetByCode({ code });
  const imagePublicId = await getPublicId(set?.key_art);

  let pageMeta: PageMeta = {
    type: 'article',
    title: set?.name || '',
    description: set?.description || '',
    image: imagePublicId,
  };

  if (set?.releasedAt) {
    pageMeta = {
      ...pageMeta,
      publishedTime: showDateTitle(set.releasedAt),
    };
  }

  return generateMeta({ page: pageMeta });
}
