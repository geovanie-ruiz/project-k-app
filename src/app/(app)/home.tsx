'use client';

import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import { Card, CardContent } from '@/components/ui/card';
import { isDarkTheme } from '@/utils/utils';
import { CldImage } from 'next-cloudinary';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Home() {
  const { theme, systemTheme } = useTheme();

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-none shadow-none">
        <CardContent className="text-center">
          <p className="mt-4 text-lg">Coming Soon: The Unofficial Home for</p>
          <h1 className="text-4xl font-bold">PROJECT K</h1>
          <CardContainer className="inter-var">
            <CardBody className="relative group/card w-auto h-auto rounded-xl p-6">
              <CardItem translateZ="100" className="w-full mt-4">
                <Suspense fallback={<div>Loading...</div>}>
                  {isDarkTheme(theme, systemTheme) ? (
                    <CldImage
                      src={'cardback-white'}
                      height="901"
                      width="647"
                      className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt="thumbnail"
                    />
                  ) : (
                    <CldImage
                      src={'cardback-black'}
                      height="901"
                      width="647"
                      className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt="thumbnail"
                    />
                  )}
                </Suspense>
              </CardItem>
            </CardBody>
          </CardContainer>
          <div className="flex items-center justify-center flex-col gap-4">
            <Link href="https://discord.com/invite/n7hgcgbvpG" target="_blank">
              Join us on Discord
            </Link>
            <Link href="https://project-k-cardmaker.vercel.app" target="_blank">
              Or Make Your Own Cards
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
