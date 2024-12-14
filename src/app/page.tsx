import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
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
