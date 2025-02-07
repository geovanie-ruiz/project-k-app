"use client";

import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { isDarkTheme } from '@/utils/utils';
import { Link } from 'lucide-react';
import { CldImage } from 'next-cloudinary';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { Suspense } from 'react';
import bg from '../../assets/bg.jpg';

export default function Home() {
  const { theme, systemTheme } = useTheme();

  return (
    <div className="bg-content2 text-white">
      <div className="relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={bg}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
        <div className="max-w-7xl mx-auto px-2 relative z-10 flex flex-col justify-center h-64 space-y-4">
          <h1 className="text-4xl font-bold drop-shadow-sm">2RUNES</h1>
          <p className="text-lg drop-shadow-sm">The Unofficial Home for PROJECT K</p>
        </div>

        {/* Diagonal Shape */}
        <div className="relative z-20">
          <div className="custom-diagonal-shape"></div>
        </div>
      </div>

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
            <div className="grid grid-cols-1 gap-4">
              <Link
                href="https://discord.com/invite/n7hgcgbvpG"
                className={buttonVariants({ variant: 'outline' })}
                target="_blank"
              >
                Join us on Discord
              </Link>

              <Link
                href="https://project-k-cardmaker.vercel.app"
                className={buttonVariants({ variant: 'outline' })}
                target="_blank"
              >
                Or Make Your Own Cards
              </Link>

              <Link
                href="https://apps.apple.com/us/app/projectk-companion/id6740396103"
                className={buttonVariants({ variant: 'outline' })}
                target="_blank"
              >
                Or Get the Project K Companion
              </Link>

              <div>
                <span>Or try one of the digital clients</span>
                <div className="flex flex-row justify-center gap-8">
                  <Link
                    href="https://discord.gg/cKqHWCV42P"
                    className={buttonVariants({ variant: 'outline' })}
                    target="_blank"
                  >
                    Rune Battlegrounds
                  </Link>
                  <Link
                    href="https://discord.gg/F4StJwvpwc"
                    className={buttonVariants({ variant: 'outline' })}
                    target="_blank"
                  >
                    Pixelborn
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* <div className="py-4 container max-w-5xl mx-auto ">
        <h2 className="text-xl uppercase font-bold mb-4">Latest Public Decks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-2">

        </div>
      </div> */}
    </div>
  );
}
