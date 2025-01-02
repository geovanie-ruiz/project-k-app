'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Spoiler } from '@/payload-types';
import { showDateTitle } from '@/utils/utils';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';

interface SpoilerModalProps {
  spoiler: Spoiler;
  isOpen: boolean;
  onClose: () => void;
}

export function SpoilerModal({ spoiler, isOpen, onClose }: SpoilerModalProps) {
  const isVertical = spoiler.type !== 'Battlefield';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[1000px] w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">
            {spoiler.title} - Spoiled {showDateTitle(spoiler.createdAt)}
          </DialogTitle>
        </DialogHeader>

        <div
          className={`grid gap-4 py-4 ${
            isVertical ? 'lg:grid-cols-2' : 'grid-cols-1'
          }`}
        >
          {spoiler.card_art &&
          typeof spoiler.card_art !== 'number' &&
          spoiler.card_art.filename ? (
            <div
              className={`relative w-full ${
                isVertical
                  ? 'h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]'
                  : 'h-[300px] lg:h-[400px]'
              }`}
            >
              <CldImage
                src={spoiler.card_art.filename}
                alt={spoiler.card_art.alt || ''}
                fill
                className="object-contain rounded-md"
                sizes={
                  isVertical
                    ? '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px'
                    : '(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 500px'
                }
              />
            </div>
          ) : (
            <div className="relative w-full h-[300px] lg:h-[400px]">
              <CldImage
                src={'cardback-black'}
                alt={'No spoiler image available'}
                fill
                className="object-contain rounded-md"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 500px"
              />
            </div>
          )}

          <div className="flex flex-col justify-between">
            <p className="text-sm md:text-base text-muted-foreground">
              {spoiler.description}
            </p>

            <p className="text-sm md:text-base text-muted-foreground">
              Spoiler source: {spoiler.source_description}
            </p>

            <div className="flex flex-col sm:flex-row justify-between mt-4 gap-2">
              <Link
                href={spoiler.source_url || '#'}
                className="w-full sm:w-auto"
                target="_blank"
              >
                More Info
              </Link>

              {spoiler.card ? (
                <Link
                  href={'#'}
                  className={buttonVariants({ variant: 'outline' })}
                >
                  Card
                </Link>
              ) : (
                <Button variant="outline" disabled>
                  Card
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
