import { MetaProps, PageMeta, generateMeta } from '@/utils/opengraph';
import { Metadata } from 'next';
import Privacy from './privacy';

export default Privacy;

export async function generateMetadata(): Promise<Metadata> {
  const pageMeta: PageMeta = {
    type: 'website',
    title: 'Privacy Policy',
    description: 'Policy copy detailing how private data is handled.',
  };
  const metaProps: MetaProps = {
    page: pageMeta,
  };
  return generateMeta(metaProps);
}
