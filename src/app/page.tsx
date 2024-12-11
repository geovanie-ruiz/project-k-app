import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white dark:bg-neutral-950 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <Card className="w-full max-w-md border-none shadow-none">
        <CardContent className="text-center">
          <p className="mt-4 text-lg">Coming Soon: The Unofficial Home for</p>
          <h1 className="text-4xl font-bold">PROJECT K</h1>
          <CardContainer className="inter-var">
            <CardBody className="relative group/card w-auto h-auto rounded-xl p-6">
              <CardItem translateZ="100" className="w-full mt-4">
                <Image
                  src="/cardback.png"
                  height="901"
                  width="647"
                  className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
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
