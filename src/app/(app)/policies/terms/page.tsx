import { MetaProps, PageMeta, generateMeta } from '@/utils/opengraph';
import { Metadata } from 'next';
import Terms from './terms';

export default Terms;

export async function generateMetadata(): Promise<Metadata> {
  const pageMeta: PageMeta = {
    type: 'website',
    title: 'Terms & Conditions',
    description:
      'Policy copy detailing the terms and conditions for use of 2Runes.gg.',
  };
  const metaProps: MetaProps = {
    page: pageMeta,
  };
  return generateMeta(metaProps);
}
