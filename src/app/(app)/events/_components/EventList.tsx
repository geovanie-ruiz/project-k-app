'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Event, User } from '@/payload-types';
import { ParsedEvent } from '@/utils/types/events.types';
import { useUser as useClerkUser } from '@clerk/nextjs';
import { Pencil, Trash2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { EventBox } from './EventBox';

interface EventListProps {
  events: ParsedEvent[];
  onEventClick: (event: ParsedEvent) => void;
  onEventEdit: (event: ParsedEvent) => void;
  onEventDelete: (event: ParsedEvent) => void;
  scrollToDate?: Date;
  isLoading?: boolean;
}

const EventList = ({
  events,
  onEventClick,
  onEventEdit,
  onEventDelete,
  scrollToDate,
  isLoading,
}: EventListProps) => {
  const { isSignedIn, user: clerkUser } = useClerkUser();

  const eventRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const isUserContributed = (event: Event, clerkUserId: string) => {
    const contributor = event.contributor as User;
    return contributor?.clerk_id === clerkUserId;
  };

  useEffect(() => {
    if (scrollToDate) {
      const dateString = scrollToDate.toDateString();
      const element = eventRefs.current[dateString];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [scrollToDate]);

  if (isLoading) {
    return (
      <ScrollArea className="h-[calc(100vh-2rem)] pr-4">
        <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-4 w-1/4 mb-2" />
            <Skeleton className="h-16 w-full" />
          </div>
        ))}
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="md:h-[calc(100vh-2rem)] pr-4">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      {events.map((event) => (
        <div
          key={event.id}
          ref={(el) => {
            eventRefs.current[event.startDate.toDateString()] = el;
          }}
          className="mb-4 p-4 border rounded hover:bg-muted"
        >
          <div className="flex justify-between items-start">
            <div className="cursor-pointer" onClick={() => onEventClick(event)}>
              <EventBox event={event} />
            </div>
            {isSignedIn && isUserContributed(event, clerkUser.id) && (
              <div className="flex flex-row">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventEdit(event);
                  }}
                  aria-label="Delete event"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventDelete(event);
                  }}
                  aria-label="Delete event"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </ScrollArea>
  );
};

export default EventList;
