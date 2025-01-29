import { Event } from '@/payload-types';

export enum EventType {
  RELEASE = 'Release',
  PRERELEASE = 'Pre-Release',
  REGIONALS = 'Regional Tournament',
  NATIONALS = 'National Tournament',
  WORLDS = 'World Tournament',
  COMMUNITY = 'Community Event',
  SPECIAL = 'Special Event',
}

export const EVENT_TYPES: EventType[] = [
  EventType.COMMUNITY,
  EventType.NATIONALS,
  EventType.PRERELEASE,
  EventType.REGIONALS,
  EventType.RELEASE,
  EventType.SPECIAL,
  EventType.WORLDS,
];

export type ParsedEvent = Event & {
  startDate: Date;
  endDate: Date;
};
