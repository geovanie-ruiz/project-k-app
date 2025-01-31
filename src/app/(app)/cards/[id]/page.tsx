import { notFound } from 'next/navigation';
import { getPayload } from 'payload';

import type { Media } from '@/payload-types';

import config from '@/payload.config';

import { Metadata } from 'next';

import { generateMeta, PageMeta } from '@/utils/opengraph';
import { queryCardById } from './_actions/queryCardById';

export type CardViewProps = {
  params: Promise<{ id: number }>;
};

export default async function CardView({ params }: CardViewProps) {
  const { id = 0 } = await params;

  const card = await queryCardById({ id });
  if (!card) return notFound();

  return (
    <article id={`card-${card.id}`}>
      <div>{card.full_card_name}</div>
    </article>
  );
}

const getPublicId = async (
  cardArt: number | Media | undefined | null
): Promise<string> => {
  if (!cardArt) return 'cardback-blue';
  if (!cardArt || typeof cardArt === 'number') {
    const payload = await getPayload({ config });
    const image = await payload.findByID({
      collection: 'media',
      id: cardArt,
    });
    return image.filename!;
  }
  return cardArt.filename!;
};

export async function generateMetadata({
  params,
}: CardViewProps): Promise<Metadata> {
  const { id = 0 } = await params;

  const card = await queryCardById({ id });
  const imagePublicId = await getPublicId(card?.card_art);

  const pageMeta: PageMeta = {
    type: 'article',
    title: card?.full_card_name || '',
    description: card?.abilities_text || '',
    image: imagePublicId,
  };

  return generateMeta({ page: pageMeta });
}
