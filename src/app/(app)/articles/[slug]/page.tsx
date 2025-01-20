import { notFound } from 'next/navigation';
import { getPayload } from 'payload';

import type { CreatorProfiles, Media, User } from '@/payload-types';

import config from '@/payload.config';
import { RefreshRouteOnSave } from './RefreshRouteOnSave';

import RichText from '@/components/custom/richText';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { Metadata } from 'next';
import { AlsoBy } from './_components/alsoBy';
import { ArticleHero, HeroProps } from './_components/hero';

import {
  DEFAULT_OG_IMAGE_PUBLIC_ID,
  generateMeta,
  PageMeta,
} from '@/utils/opengraph';
import { showDateTitle } from '@/utils/utils';

type ArticleViewProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview: boolean }>;
};

type AuthorInfo = {
  authorId: number;
  authorName: string;
  links: CreatorProfiles;
};

const getAuthorById = async (authorId: number) => {
  const payload = await getPayload({ config });
  const article = await payload.findByID({
    collection: 'users',
    id: authorId,
  });
  return article || null;
};

const getAuthor = async (
  author: number | User | null | undefined
): Promise<AuthorInfo> => {
  const authorInfo: AuthorInfo = { authorId: -1, authorName: '', links: [] };
  if (!author) return authorInfo;
  if (typeof author === 'number') {
    const user = await getAuthorById(author);
    authorInfo.authorId = author;
    authorInfo.authorName = user?.author_name ?? user.username!;
    authorInfo.links = user?.links || [];
  } else {
    authorInfo.authorId = author.id;
    authorInfo.authorName = author?.author_name ?? author.username!;
    authorInfo.links = author?.links || [];
  }

  return authorInfo;
};

const queryRelatedByAuthorId = async ({
  slug,
  authorId,
  preview,
}: {
  slug: string;
  authorId: number;
  preview: boolean;
}) => {
  const payload = await getPayload({ config });
  const articlesAlsoBy = await payload.find({
    collection: 'articles',
    draft: preview,
    where: {
      slug: {
        not_equals: slug,
      },
      author: {
        equals: authorId,
      },
    },
    sort: '-publishedAt',
    limit: 3,
  });
  return articlesAlsoBy.docs;
};

const queryArticleBySlug = async ({
  slug,
  preview,
}: {
  slug: string;
  preview: boolean;
}) => {
  const payload = await getPayload({ config });
  const article = await payload.find({
    collection: 'articles',
    draft: preview,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  });
  return article.docs?.[0] || null;
};

const getPublicId = async (
  coverImage: number | Media | undefined
): Promise<string> => {
  if (!coverImage) return DEFAULT_OG_IMAGE_PUBLIC_ID;
  if (!coverImage || typeof coverImage === 'number') {
    const payload = await getPayload({ config });
    const image = await payload.findByID({
      collection: 'media',
      id: coverImage,
    });
    return image.filename!;
  }
  return coverImage.filename!;
};

export default async function ArticleView({
  params,
  searchParams,
}: ArticleViewProps) {
  const { slug = '' } = await params;
  const { preview } = await searchParams;

  const article = await queryArticleBySlug({ slug, preview });

  if (!article) return notFound();

  const {
    authorId,
    authorName,
    links: authorLinks,
  } = await getAuthor(article?.author);

  const heroProps: HeroProps = {
    title: article.title,
    excerpt: article.excerpt,
    author: authorName,
    publishedDate: article?.publishedAt ?? '',
    heroImage: article.coverImage as Media,
    links: authorLinks,
    categories: article.tags,
  };

  const alsoBy = await queryRelatedByAuthorId({ slug, authorId, preview });

  const articleContent = article.content as SerializedEditorState;

  return (
    <article id={`article-${article.id}`}>
      <RefreshRouteOnSave />

      <ArticleHero {...heroProps} />

      <RichText
        className="max-w-[48rem] mx-auto"
        data={articleContent}
        enableGutter={false}
      />

      <AlsoBy authorName={authorName ?? ''} articles={alsoBy} />
    </article>
  );
}

export async function generateMetadata({
  params,
}: ArticleViewProps): Promise<Metadata> {
  const { slug = '' } = await params;

  const article = await queryArticleBySlug({ slug, preview: false });
  const { authorName } = await getAuthor(article?.author);
  const imagePublicId = await getPublicId(article.coverImage);

  let pageMeta: PageMeta = {
    type: 'article',
    title: article.title,
    description: article.excerpt,
    image: imagePublicId,
    authors: authorName,
    tags: article.tags
      .map((tag) => {
        if (typeof tag === 'number') return '';
        return `${tag.title}`;
      })
      .filter((tag) => tag !== ''),
  };

  if (article.publishedAt) {
    pageMeta = {
      ...pageMeta,
      publishedTime: showDateTitle(article.publishedAt),
    };
  }

  return generateMeta({ page: pageMeta });
}
