import RuneIcon from '@/components/icons/RuneIcon';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import config from '@/payload.config';
import { getPayload } from 'payload';

const queryArticleTitleBySlug = async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config });
  const article = await payload.find({
    collection: 'articles',
    select: {
      title: true,
    },
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });
  return article.docs?.[0]?.title || '';
};

export default async function BreadcrumbSlot({
  params,
}: {
  params: { slug: string };
}) {
  const { slug = '' } = params;
  const article = await queryArticleTitleBySlug({ slug });

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <RuneIcon />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/articles">Articles</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="capitalize">{article}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
