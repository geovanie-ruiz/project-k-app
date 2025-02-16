import { notFound } from 'next/navigation';
import { getPayload } from 'payload';

import { Media } from '@/payload-types';

import config from '@/payload.config';

import { Metadata } from 'next';

import { CardPage } from '@/app/(app)/cards/[id]/_components/CardPage';
import { PageMeta, generateMeta } from '@/utils/opengraph';
import { queryCardBySetIndex } from './_actions/queryCardBySetIndex';

export type CardSetViewProps = {
  params: Promise<{ code: string; setIndex: number }>;
};

export default async function CardSetView({ params }: CardSetViewProps) {
  const { code, setIndex } = await params;

  const card = await queryCardBySetIndex({ setCode: code, setIndex });
  if (!card) return notFound();

  return (
    <article id={`card-${card.id}`}>
      <CardPage card={card} />
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
}: CardSetViewProps): Promise<Metadata> {
  const { code, setIndex } = await params;

  const card = await queryCardBySetIndex({ setCode: code, setIndex });
  const imagePublicId = await getPublicId(card?.card_art);

  const pageMeta: PageMeta = {
    type: 'article',
    title: card?.full_card_name || '',
    description: card?.abilities_text || '',
    image: imagePublicId,
  };

  return generateMeta({ page: pageMeta });
}
