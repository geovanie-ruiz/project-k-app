'use client';

import SocialLink, { SupportedSocials } from '@/components/custom/socialsLink';
import { Category, CreatorProfiles, Media } from '@/payload-types';
import { showDateTitle } from '@/utils';
import { CldImage } from 'next-cloudinary';
import React from 'react';
import { TagList } from '../../../../../components/custom/tagList';

export type HeroProps = {
  title: string;
  excerpt: string;
  author: string;
  publishedDate?: string;
  heroImage: Media;
  links: CreatorProfiles;
  categories: (number | Category)[];
};

const formatPublishedDate = (date: string | undefined) => {
  if (!date) return 'Draft Article';

  return `Published on ${showDateTitle(date)}`;
};

export const ArticleHero: React.FC<HeroProps> = ({
  title,
  excerpt,
  author,
  publishedDate,
  heroImage,
  links,
  categories,
}) => {
  const tags = categories
    .map((category) => {
      if (typeof category === 'number') return '';
      return `${category.title}`;
    })
    .filter((tag) => tag !== '');
  return (
    <div className="w-full mb-8">
      <div className="relative w-full aspect-[16/9] max-w-5xl mx-auto overflow-hidden">
        <CldImage
          src={heroImage.filename!}
          alt={title}
          width={1920}
          height={1080}
          crop="fill"
          gravity="auto"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 87vw, 1200px"
          className="rounded-lg object-cover"
          priority
        />
      </div>
      <div className="max-w-3xl mx-auto px-4 mt-8">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-xl mb-6">{excerpt}</p>
        <div className="flex flex-col gap-6 md:flex-row justify-between">
          <div className="flex flex-col md:flex-row">
            <span className="font-semibold">{`By ${author}`}</span>
            <span className="mx-2 max-sm:hidden">·</span>
            <span className="text-muted-foreground">
              {formatPublishedDate(publishedDate)}
            </span>
          </div>
          {links && links.length > 0 && (
            <div className="grid grid-flow-col gap-4">
              {links.map((link, index) => {
                return (
                  <SocialLink
                    key={`social-${link?.id || index}`}
                    url={link.url}
                    site={link.site as SupportedSocials}
                  />
                );
              })}
            </div>
          )}
        </div>
        <TagList tags={tags} />
      </div>
    </div>
  );
};
