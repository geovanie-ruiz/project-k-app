'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Article, Media } from '@/payload-types';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';

export const AlsoBy = ({
  authorName,
  articles,
}: {
  authorName: string;
  articles: Article[];
}) => (
  <div className="bg-muted py-12 mt-16">
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8">Also by {authorName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Card
            key={article.id}
            className="bg-muted-foreground relative overflow-hidden group"
          >
            <div className="absolute inset-0">
              <CldImage
                src={(article.coverImage as Media).filename!}
                alt={`Background for ${article.title}`}
                width={400}
                height={300}
                crop="fill"
                gravity="auto"
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 group-hover:bg-opacity-70"></div>
            </div>
            <CardHeader className="relative z-10">
              <CardTitle>{article.title}</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p>{article.excerpt}</p>
              <Link
                href={`/articles/${article.slug}`}
                className="hover:underline mt-4 inline-block"
              >
                Read more
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </div>
);
