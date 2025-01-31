'use server';

import { Card } from '@/payload-types';
import config from '@/payload.config';
import { getPayload, Where } from 'payload';
import { CARDS_PER_PAGE } from '../_components/CardList';

export type CardFilterField =
  | 'name'
  | 'subtitle'
  | 'type'
  | 'rune' // array
  | 'cost'
  | 'recycleSerial'
  | 'set.id'
  | 'rarity'
  | 'artist'
  | 'might'
  | 'keyword' // array
  | 'tag' // array
  | 'abilities_text'
  | 'flavor'
  | 'character.name';

export type CardFilterOperator =
  | 'equals'
  | 'not_equals'
  | 'greater_than'
  | 'greater_than_equal'
  | 'less_than'
  | 'less_than_equal'
  | 'like'
  | 'contains'
  | 'in' // array
  | 'not_in' // array
  | 'all'; // array

export type CardFilter = {
  field: CardFilterField;
  operation: CardFilterOperator;
  value: string | number | (string | number)[];
};

export type CardSort = {
  field: 'name' | 'cost';
  order: 'asc' | 'desc';
};

type CardFetchProps = {
  page?: number;
  pageSize?: number;
  filters?: CardFilter[];
  sorts?: CardSort[];
};

const getSortBy = (sorts: CardSort[]) => {
  return sorts.map(({ field, order }) => {
    return order === 'asc' ? field : `-${field}`;
  });
};

const isArrayOp = (op: CardFilterOperator) =>
  ['in', 'not_in', 'all'].includes(op);

const getWhere = (filters: CardFilter[]) => {
  const where: Where = {};

  filters.forEach(({ field, operation, value }) => {
    if (isArrayOp(operation)) {
      if (!Array.isArray(value)) {
        console.error(`Operation ${operation} requires an array value`);
        value = [value];
      }
    } else {
      if (Array.isArray(value)) {
        console.error(`Operation ${operation} does not support an array value`);
        value = value[0];
      }
    }

    where[field] = { [operation]: value };
  });

  return where;
};

export async function fetchCards({
  page = 1,
  pageSize = CARDS_PER_PAGE,
  filters = [],
  sorts = [{ field: 'name', order: 'asc' }],
}: CardFetchProps): Promise<{ cards: Card[]; hasMore: boolean }> {
  const payload = await getPayload({ config });
  const cards = await payload.find({
    collection: 'cards',
    where: getWhere(filters),
    sort: getSortBy(sorts),
    limit: pageSize,
    page: page,
    depth: 2,
  });

  return {
    cards: cards.docs,
    hasMore: cards.hasNextPage,
  };
}
