'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CldImage } from 'next-cloudinary';
import { useState } from 'react';

export type ArtVariant = {
  publicId: string;
  variantName: string;
};

type VariantsCarouselProps = {
  variants: ArtVariant[];
};

export default function VariantsCarousel({ variants }: VariantsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? variants.length - 1 : prevIndex - 1
    );
    setIsLoading(true);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === variants.length - 1 ? 0 : prevIndex + 1
    );
    setIsLoading(true);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsLoading(true);
  };

  return (
    <div>
      <div>
        {isLoading && <Skeleton className={'size-auto rounded-xl'} />}
        <CldImage
          src={variants[currentIndex].publicId}
          alt={
            variants[currentIndex].variantName || 'Unset variant label for card'
          }
          width={1000}
          height={800}
          className="rounded-xl px-1"
          onLoad={() => setIsLoading(false)}
          priority
        />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={handlePrevious}
          className="bg-background p-2 rounded-full shadow-md hover:bg-accent transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="size-6" />
        </button>
        <div>
          <div className="text-center font-semibold flex-grow">
            {variants[currentIndex].variantName}
          </div>
          <div className="flex justify-center space-x-2">
            {variants.map((_, index) => (
              <Button
                key={index}
                variant="outline"
                size="icon"
                className={`size-2 p-0 rounded-full ${index === currentIndex ? 'bg-primary' : 'bg-background'}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <button
          onClick={handleNext}
          className="bg-background p-2 rounded-full shadow-md hover:bg-accent transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="size-6" />
        </button>
      </div>
    </div>
  );
}
