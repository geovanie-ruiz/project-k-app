'use client';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Media } from '@/payload-types';
import { CldImage } from 'next-cloudinary';
import React from 'react';
import { formatReleaseDate } from '../../_components/SetList';
import { Donut } from './donut';

export type HeroProps = {
  name: string;
  description: string;
  setCode: string;
  cardTotal: number;
  releaseDate?: string;
  heroImage: Media;
  collected?: number;
};

export const SetHero: React.FC<HeroProps> = ({
  name,
  setCode,
  cardTotal,
  releaseDate,
  heroImage,
  collected = 0,
}) => (
  <div className="mb-4">
    <div className="relative mx-auto overflow-hidden">
      <CldImage
        src={heroImage?.filename || 'cardback-blue'}
        alt={name}
        width={1920}
        height={540}
        crop="fill"
        gravity="auto"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 87vw, 1200px"
        className="rounded-t-lg object-cover"
        priority
      />

      <div className="flex flex-col md:flex-row justify-between p-4 bg-background rounded-b-lg gap-4">
        <div className="flex flex-col">
          <span className="text-4xl font-bold">{name}</span>
          <span className="text-muted-foreground">
            {formatReleaseDate(releaseDate)}
          </span>
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex flex-col text-center my-auto">
            <div className="text-sm">SET CODE</div>
            <div>
              <Badge
                className="mx-auto"
                variant="default"
              >{`${setCode.toUpperCase()}`}</Badge>
            </div>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col text-center my-auto">
            <div className="text-sm">SET TOTAL</div>
            <div>{cardTotal}</div>
          </div>
          <div className="flex flex-col text-center my-auto">
            <div className="text-sm">COLLECTED</div>
            <div>{collected}</div>
          </div>
          <div className="flex flex-col text-center my-auto">
            <Donut collected={collected} total={cardTotal} />
          </div>
        </div>
      </div>
    </div>
  </div>
);
