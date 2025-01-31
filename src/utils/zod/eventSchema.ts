import { z } from 'zod';
import { EventType } from '../types/events.types';

export const eventSchema = z
  .object({
    title: z.string().min(3, 'Name must be at least 3 characters'),
    description: z
      .string()
      .min(3, 'Description must be at least 3 characters.'),
    eventType: z.nativeEnum(EventType),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: 'End date cannot be earlier than start date.',
    path: ['endDate'],
  });
