import { Event } from '@/payload-types';

type EventFormFieldErrors = {
  title?: string[] | undefined;
  description?: string[] | undefined;
  date?: string[] | undefined;
  eventType?: string[] | undefined;
};

export type EventFormState = {
  success?: boolean;
  event?: Event;
  error?: boolean;
  errors?: EventFormFieldErrors;
};
