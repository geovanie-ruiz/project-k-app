'use client';

import { Badge } from '@/components/ui/badge';
import { Media } from '@/payload-types';
import { CldImage } from 'next-cloudinary';
import React from 'react';
import { formatReleaseDate } from '../../_components/SetList';

export type HeroProps = {
  name: string;
  description: string;
  setCode: string;
  cardTotal: number;
  releaseDate?: string;
  heroImage: Media;
};

export const SetHero: React.FC<HeroProps> = ({
  name,
  description,
  setCode,
  cardTotal,
  releaseDate,
  heroImage,
}) => (
  <div className="w-full mb-8">
    <div className="relative w-full aspect-[16/9] max-w-5xl mx-auto overflow-hidden">
      <CldImage
        src={heroImage?.filename || 'cardback-blue'}
        alt={name}
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
      <h1 className="text-4xl font-bold mb-4">
        {name}
        <Badge
          className="align-middle ml-2 mb-1"
          variant="default"
        >{`${setCode.toUpperCase()}`}</Badge>
      </h1>

      <p className="text-xl mb-6">{description}</p>
      <div className="flex flex-col gap-6 md:flex-row justify-between">
        <div className="flex flex-col md:flex-row">
          <span className="font-semibold">{cardTotal} New Cards</span>
          <span className="mx-2 max-sm:hidden">·</span>
          <span className="text-muted-foreground">
            {formatReleaseDate(releaseDate)}
          </span>
        </div>
      </div>
    </div>
  </div>
);
