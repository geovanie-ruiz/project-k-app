'use server';

import { cache } from '@/utils/cache';
import { getFilteredEvents } from '../_actions';

export const getEvents = cache(
  async (filters: string[], startDate: Date, endDate: Date) =>
    await getFilteredEvents(filters, startDate, endDate),
  ['getEvents'],
  {
    tags: ['events'],
  }
);
