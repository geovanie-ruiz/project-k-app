import { MetaProps, PageMeta, generateMeta } from '@/utils/opengraph';
import { Metadata } from 'next';
import { Calendar } from './_components/Calendar';

export default async function Spoilers() {
  return (
    <div className="mx-auto w-full max-w-screen-xl">
      <Calendar />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const pageMeta: PageMeta = {
    type: 'website',
    title: 'Community Calendar',
    description: 'Dates for Project K events.',
  };
  const metaProps: MetaProps = {
    page: pageMeta,
  };
  return generateMeta(metaProps);
}
