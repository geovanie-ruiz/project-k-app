'use server';

import { EventType, ParsedEvent } from '@/utils/types/events.types';

import config from '@/payload.config';
import { currentUser } from '@clerk/nextjs/server';
import { getPayload, Where } from 'payload';

import { eventSchema } from '@/utils/zod/eventSchema';
import { EventFormState } from '../_forms/types';

import { Event } from '@/payload-types';
import { revalidatePath } from 'next/cache';

const parseEvent = (event: Event): ParsedEvent => {
  return {
    ...event,
    startDate: new Date(event.start_date),
    endDate: new Date(event.end_date),
  };
};

export async function createEvent(
  prevState: EventFormState,
  formData: FormData
): Promise<EventFormState> {
  const parse = eventSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    startDate: formData.get('startDate'),
    endDate: formData.get('endDate'),
    eventType: formData.get('category') as EventType,
  });

  if (!parse.success)
    return {
      ...prevState,
      success: false,
      error: true,
      errors: parse.error.flatten().fieldErrors,
    };

  const data = parse.data;

  // Solve timezone issue same way payloadcms does
  data.startDate.setHours(data.startDate.getHours() + 12);
  data.endDate.setHours(data.endDate.getHours() + 12);

  const payload = await getPayload({ config });

  const clerkUser = await currentUser();
  const user = await payload.find({
    collection: 'users',
    where: {
      clerk_id: {
        equals: clerkUser?.id,
      },
    },
  });

  const newEvent = await payload.create({
    collection: 'events',
    data: {
      title: data.title,
      contributor: user.docs.at(0)!,
      start_date: data.startDate.toISOString(),
      end_date: data.endDate.toISOString(),
      type: data.eventType,
      description: data.description,
    },
  });

  return {
    success: true,
    event: newEvent,
  };
}

export async function getFilteredEvents(
  filters?: string[],
  startDate?: Date,
  endDate?: Date
): Promise<ParsedEvent[]> {
  const where: Where = {
    approved: {
      equals: true,
    },
  };

  if (filters && filters.length > 0) {
    where['type'] = {
      in: filters,
    };
  }

  if (startDate && endDate) {
    where['and'] = [
      {
        start_date: {
          greater_than_equal: startDate,
        },
      },
      {
        end_date: {
          less_than_equal: endDate,
        },
      },
    ];
  }

  const payload = await getPayload({ config });
  const events = await payload.find({
    collection: 'events',
    where: where,
    sort: 'start_date',
    limit: -1,
  });

  return events.docs.map(parseEvent);
}

export async function editEvent(
  prevState: EventFormState,
  formData: FormData
): Promise<EventFormState> {
  const eventId = formData.get('eventId') as string;

  const parse = eventSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    startDate: formData.get('startDate'),
    endDate: formData.get('endDate'),
    eventType: formData.get('category') as EventType,
  });

  if (!parse.success)
    return {
      ...prevState,
      success: false,
      error: true,
      errors: parse.error.flatten().fieldErrors,
    };

  const data = parse.data;

  // Solve timezone issue same way payloadcms does
  data.startDate.setHours(data.startDate.getHours() + 12);
  data.endDate.setHours(data.endDate.getHours() + 12);

  const payload = await getPayload({ config });
  const editEvent = await payload.update({
    collection: 'events',
    id: eventId,
    data: {
      title: data.title,
      start_date: data.startDate.toDateString(),
      end_date: data.endDate.toDateString(),
      type: data.eventType,
      description: data.description,
      approved: false,
    },
  });

  return {
    success: true,
    event: editEvent,
  };
}

export async function deleteEvent(eventId: number) {
  const payload = await getPayload({ config });
  const result = await payload.delete({
    collection: 'events',
    id: eventId,
  });

  revalidatePath('/events');

  return { success: !!result };
}
