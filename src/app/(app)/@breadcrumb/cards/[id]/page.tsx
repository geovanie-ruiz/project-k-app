import { queryCardById } from '@/app/(app)/cards/[id]/_actions/queryCardById';
import { CardViewProps } from '@/app/(app)/cards/[id]/page';
import RuneIcon from '@/components/icons/RuneIcon';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default async function BreadcrumbSlot({ params }: CardViewProps) {
  const { id = 0 } = await params;
  const card = await queryCardById({ id });

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
          <BreadcrumbLink href="/cards">Cards</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="capitalize">
            {card?.full_card_name || 'Unknown Card'}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
