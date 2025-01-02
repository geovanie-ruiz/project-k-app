import { Card, CardCollection, Set } from '@/payload-types';
import type { FieldHook } from 'payload';

interface CollectedCard {
  card?: (number | null) | Card;
  normal?: number | null;
  foil?: number | null;
  id?: string | null;
}

interface SetCompletion {
  set?: (number | null) | Set;
  cards?: CollectedCard[] | null;
  completion?: string | null;
  id?: string | null;
}

type UpdateSetCompletionFieldHook = FieldHook<
  CardCollection,
  string,
  SetCompletion
>;
const updateSetCompletionFieldHook: UpdateSetCompletionFieldHook = async ({
  siblingData,
  req,
}) => {
  if (!siblingData.set) return 'Oops: No Set';
  if (!siblingData.cards || siblingData.cards.length === 0)
    return 'Not Started';

  const collectedInSet = siblingData.cards.length;

  const cardSet = await req.payload.findByID({
    collection: 'sets',
    id: siblingData.set as number,
  });

  if (!cardSet || !cardSet.collectible || cardSet.collectible === 0)
    return 'Oops: Check Set';

  let percent = new Intl.NumberFormat('default', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    roundingMode: 'floor',
  }).format(collectedInSet / cardSet.collectible);

  if (percent === '0%') percent = '< 1%';
  return `${collectedInSet} out of ${cardSet.collectible} (${percent})`;
};

export default updateSetCompletionFieldHook;
