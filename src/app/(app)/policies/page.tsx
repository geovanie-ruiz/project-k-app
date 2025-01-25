import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { MetaProps, PageMeta, generateMeta } from '@/utils/opengraph';
import { Metadata } from 'next';
import Link from 'next/link';

type PolicyCardProps = {
  policy: string;
  page: string;
  description: string;
};

const POLICIES = [
  {
    id: 1,
    policy: 'Privacy Policy',
    page: 'privacy',
    description: 'Learn how we collect and use your data.',
  },
  {
    id: 2,
    policy: 'Cookie Policy',
    page: 'cookies',
    description: 'Understand how we use cookies on our website.',
  },
  {
    id: 3,
    policy: 'Terms & Conditions',
    page: 'terms',
    description: 'Read the terms and conditions of using our website.',
  },
];

const PolicyCard = ({ policy, page, description }: PolicyCardProps) => (
  <Card className="h-full flex flex-col">
    <CardContent className="flex-grow p-4">
      <CardTitle className="mb-2 flex items-center gap-2">
        <Link href={`/policies/${page}`} className="hover:underline">
          {policy}
        </Link>
      </CardTitle>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
    </CardContent>
    <CardFooter className="p-4 pt-0">
      <Button asChild>
        <Link href={`/policies/${page}`}>Read More</Link>
      </Button>
    </CardFooter>
  </Card>
);

export default async function Policies() {
  return (
    <section>
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="flex items-center justify-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
            Policies
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POLICIES.map((policy) => (
            <PolicyCard
              key={policy.id}
              policy={policy.policy}
              page={policy.page}
              description={policy.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const pageMeta: PageMeta = {
    type: 'website',
    title: '2Runes Policies',
    description: 'Privacy policy, Cookie policy, Terms & Conditions',
  };
  const metaProps: MetaProps = {
    page: pageMeta,
  };
  return generateMeta(metaProps);
}
