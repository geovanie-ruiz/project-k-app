import { queryCardBySetIndex } from '@/app/(app)/sets/[code]/[setIndex]/_actions/queryCardBySetIndex';
import { CardSetViewProps } from '@/app/(app)/sets/[code]/[setIndex]/page';
import { querySetByCode } from '@/app/(app)/sets/[code]/_actions/querySetByCode';
import RuneIcon from '@/components/icons/RuneIcon';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default async function BreadcrumbSlot({ params }: CardSetViewProps) {
  const { code = '', setIndex = 0 } = await params;
  const set = await querySetByCode({ code });
  const card = await queryCardBySetIndex({ setCode: code, setIndex });

  return (
    <Breadcrumb className="mb-4 px-4 max-w-5xl mx-auto">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <RuneIcon />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/sets">Sets</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/sets/${code}`} className="capitalize">
            {set?.name || 'Unknown Set'}
          </BreadcrumbLink>
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
