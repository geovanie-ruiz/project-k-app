'use client';

import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import { Card, CardContent } from '@/components/ui/card';
import { isDarkTheme } from '@/utils/utils';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

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
                {isDarkTheme(theme, systemTheme) ? (
                  <Image
                    src="71eedeb2-87ca-4fa4-bc23-9d17fd004600/public"
                    height="901"
                    width="647"
                    className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                ) : (
                  <Image
                    src="32be31f2-ef85-4ef5-c169-4a0114388e00/public"
                    height="901"
                    width="647"
                    className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                )}
              </CardItem>
            </CardBody>
          </CardContainer>
          <Link href="https://discord.com/invite/n7hgcgbvpG">
            Join us on Discord
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
