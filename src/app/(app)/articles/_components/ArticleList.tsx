'use client';

import { TagList } from '@/components/custom/tagList';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { InView } from 'react-intersection-observer';

import { Article, Media, User } from '@/payload-types';
import { showDateTitle } from '@/utils/utils';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import { useState } from 'react';
import { fetchArticles } from '../_actions/fetchArticles';

export const ARTICLES_PER_PAGE = 10;

export function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreArticles = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const result = await fetchArticles(page, ARTICLES_PER_PAGE);
      if (result.articles.length === 0) {
        setHasMore(false);
      } else {
        setArticles((prevArticles) => [...prevArticles, ...result.articles]);
      }
      setPage((prevPage) => prevPage + 1);
      setHasMore(result.hasMore);
    } catch (error) {
      console.error('Error loading more articles:', error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInViewChange = (inView: boolean) => {
    if (inView && !isLoading) {
      loadMoreArticles();
    }
  };

  const formatPublishedDate = (date: string | null | undefined) => {
    if (!date) return 'Draft Article';

    return `Published on ${showDateTitle(date)}`;
  };

  const renderArticle = (article: Article) => {
    const heroImage = article.coverImage as Media;
    const author = article.author as User;
    const tags = article.tags
      .map((category) => {
        if (typeof category === 'number') return '';
        return `${category.title}`;
      })
      .filter((tag) => tag !== '');
    return (
      <Card key={`article-${article.id}`} className="h-full flex flex-col">
        <CardHeader className="p-0">
          <div className="relative w-full pt-[56.25%]">
            <Link href={`/articles/${article.slug!}`} className="hover:pointer">
              <CldImage
                src={heroImage.filename!}
                alt={article.title}
                fill
                crop="fill"
                gravity="auto"
                className="rounded-t-lg object-cover"
              />
            </Link>
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <CardTitle className="mb-2">
            <Link
              href={`/articles/${article.slug!}`}
              className="hover:underline"
            >
              {article.title}
            </Link>
          </CardTitle>
          <p className="text-sm mb-4">{article.excerpt}</p>
          <div className="flex flex-col md:flex-row">
            <span className="text-sm">
              {author.author_name || author.username}
            </span>
            <span className="mx-2 max-sm:hidden">·</span>
            <span className="text-sm">
              {formatPublishedDate(article.publishedAt)}
            </span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex flex-wrap gap-2">
            <TagList tags={tags} />
          </div>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => renderArticle(article))}
      </div>
      {isLoading && (
        <p className="text-center text-muted-foreground py-4">
          Loading more articles...
        </p>
      )}
      {hasMore && !isLoading && (
        <InView
          onChange={handleInViewChange}
          trackVisibility={true}
          delay={100}
          initialInView={true}
        >
          {({ ref }) => (
            <div ref={ref} className="text-center">
              <Button onClick={loadMoreArticles} variant="outline">
                Load More
              </Button>
            </div>
          )}
        </InView>
      )}
      {!hasMore && (
        <p className="text-center text-muted-foreground py-4">
          No more articles to load.
        </p>
      )}
    </div>
  );
}
