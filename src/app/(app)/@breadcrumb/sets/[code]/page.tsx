import { querySetByCode } from '@/app/(app)/sets/[code]/_actions/querySetByCode';
import { SetViewProps } from '@/app/(app)/sets/[code]/page';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';

export default async function BreadcrumbSlot({ params }: SetViewProps) {
  const { code = '' } = await params;
  const set = await querySetByCode({ code });

  return (
    <Breadcrumb className="mb-4 px-4 max-w-5xl mx-auto">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <Home />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/sets">Sets</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="capitalize">
            {set?.name || 'Unknown Set'}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
