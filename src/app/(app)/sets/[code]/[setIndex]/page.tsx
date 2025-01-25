import { notFound } from 'next/navigation';
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
      <div>{card.full_card_name}</div>
    </article>
  );
}
