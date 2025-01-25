import { notFound } from 'next/navigation';
import { getPayload } from 'payload';

import type { Media } from '@/payload-types';

import config from '@/payload.config';

import { Metadata } from 'next';

import { generateMeta, PageMeta } from '@/utils/opengraph';
import { showDateTitle } from '@/utils/utils';
import { querySetByCode } from './_actions/querySetByCode';
import { HeroProps, SetHero } from './_components/hero';

export type SetViewProps = {
  params: Promise<{ code: string }>;
};

const queryCardsBySetId = async ({ id }: { id: number }) => {
  const payload = await getPayload({ config });
  return await payload.find({
    collection: 'cards',
    where: {
      set: {
        equals: id,
      },
    },
    sort: ['set_index'],
    limit: 1,
  });
};

export default async function SetView({ params }: SetViewProps) {
  const { code = '' } = await params;

  const set = await querySetByCode({ code });
  if (!set) return notFound();

  const heroProps: HeroProps = {
    name: set.name,
    description: set.description || '',
    setCode: set.set_code,
    cardTotal: set.total,
    releaseDate: set.releasedAt || '',
    heroImage: set.key_art as Media,
  };

  const { docs: cards } = await queryCardsBySetId({ id: set.id });

  return (
    <article id={`set-${set.id}`}>
      <SetHero {...heroProps} />

      {/** suspense into a cardlist component */}
      <div className="max-w-[48rem] mx-auto">
        {cards.map((card) => (
          <div key={card.id}>{card.name}</div>
        ))}
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

  const set = await querySetByCode({ code });
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
