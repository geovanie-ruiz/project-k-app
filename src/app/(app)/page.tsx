import { MetaProps, PageMeta, generateMeta } from '@/utils/opengraph';
import { Metadata } from 'next';
import Home from './home';

export default Home;

export async function generateMetadata(): Promise<Metadata> {
  const pageMeta: PageMeta = {
    type: 'website',
    title: 'Home',
    description:
      'View spoilers, build decks, collect cards. Welcome to 2Runes.gg!',
  };
  const metaProps: MetaProps = {
    page: pageMeta,
  };
  return generateMeta(metaProps);
}
