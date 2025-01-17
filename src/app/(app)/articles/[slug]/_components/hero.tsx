'use client';

import SocialLink from '@/components/custom/socialsLink';
import { CreatorProfiles, Media } from '@/payload-types';
import { showDateTitle } from '@/utils/utils';
import { CldImage } from 'next-cloudinary';
import React from 'react';

export type HeroProps = {
  title: string;
  excerpt: string;
  author: string;
  publishedDate?: string;
  heroImage: Media;
  links: CreatorProfiles;
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
}) => (
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
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <p className="text-xl mb-4">{excerpt}</p>
      <div className="flex justify-between">
        <div>
          <span className="font-semibold">{`By ${author}`}</span>
          <span className="mx-2">·</span>
          <span className="text-muted-foreground">
            {formatPublishedDate(publishedDate)}
          </span>
        </div>
        {links && links.length > 0 && (
          <div className="grid grid-flow-col gap-4">
            {links.map((link, index) => {
              return <SocialLink key={`social-${index}`} {...link} />;
            })}
          </div>
        )}
      </div>
    </div>
  </div>
);
