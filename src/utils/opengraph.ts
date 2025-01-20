import { Metadata } from 'next';
import { getCldOgImageUrl } from 'next-cloudinary';

export const DEFAULT_OG_IMAGE_PUBLIC_ID = '2runesgg';

export type PageMeta = {
  type: 'website' | 'article';
  title: string;
  description: string;
  image?: string;
  publishedTime?: string;
  authors?: string;
  tags?: string[];
};

export type MetaProps = {
  page: PageMeta;
};

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Project K fansite with articles, spoilers, and building toward deckbuilding and collection management.',
  images: getCldOgImageUrl({
    src: DEFAULT_OG_IMAGE_PUBLIC_ID,
  }),
  siteName: '2Runes.gg',
  title: 'Project K Homepage | 2Runes.gg',
};

export const og = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  };
};

export const generateMeta = async ({ page }: MetaProps): Promise<Metadata> => {
  if (page.type === 'article') {
    return {
      description: page.title,
      openGraph: og({
        type: 'article',
        title: `${page.title} | 2Runes.gg`,
        description: page.description,
        images:
          page?.image &&
          getCldOgImageUrl({
            src: page.image,
          }),
        publishedTime: page.publishedTime,
        authors: page.authors,
        tags: page.tags,
      }),
    };
  }

  return {
    description: page.title,
    openGraph: og({
      type: 'website',
      title: `${page.title} | 2Runes.gg`,
      description: page.description,
      images:
        page?.image &&
        getCldOgImageUrl({
          src: page.image,
        }),
    }),
  };
};
