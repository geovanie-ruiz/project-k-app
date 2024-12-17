'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { showDateTitle } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Spoiler } from '../_types/spoiler';

interface SpoilerModalProps {
  spoiler: Spoiler;
  isOpen: boolean;
  onClose: () => void;
}

export function SpoilerModal({ spoiler, isOpen, onClose }: SpoilerModalProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isVertical = spoiler.card_type !== 'battlefield';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[1000px] w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">
            Published {showDateTitle(spoiler.published_on, true)}
          </DialogTitle>
        </DialogHeader>

        <div
          className={`grid gap-4 py-4 ${
            isVertical ? 'lg:grid-cols-2' : 'grid-cols-1'
          }`}
        >
          {spoiler.image_url && (
            <div
              className={`relative w-full ${
                isVertical
                  ? 'h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]'
                  : 'h-[300px] lg:h-[400px]'
              }`}
            >
              <Image
                src={spoiler.image_url}
                alt={spoiler.description || ''}
                fill
                className="object-contain rounded-md"
                sizes={
                  isVertical
                    ? '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px'
                    : '(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 500px'
                }
              />
            </div>
          )}

          <div className="flex flex-col justify-between">
            <p className="text-sm md:text-base text-muted-foreground">
              {spoiler.description}
            </p>

            <p className="text-sm md:text-base text-muted-foreground">
              Spoiler source: {spoiler.source_text}
            </p>

            <div className="flex flex-col sm:flex-row justify-between mt-4 gap-2">
              <Link
                href={spoiler.source_url || '#'}
                className="w-full sm:w-auto"
              >
                More Info
              </Link>
              <Link
                href={spoiler.source_url || '#'}
                className="w-full sm:w-auto"
              >
                <Button variant="outline" disabled={!spoiler.card}>
                  Card
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
