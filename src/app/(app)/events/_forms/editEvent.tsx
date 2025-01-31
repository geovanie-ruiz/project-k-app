'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  EVENT_TYPES,
  EventType,
  ParsedEvent,
} from '@/utils/types/events.types';
import { useActionState, useEffect, useState } from 'react';
import { editEvent } from '../_actions';

import { toast } from 'sonner';

type EventSubmissionFormProps = {
  selectedEvent: ParsedEvent;
  onEventSubmitted: () => void;
  setIsOpen: (open: boolean) => void;
};

export const EditEventForm = ({
  selectedEvent,
  onEventSubmitted,
  setIsOpen,
}: EventSubmissionFormProps) => {
  const [eventTitle, setEventTitle] = useState<string>(selectedEvent.title);
  const [eventDescription, setEventDescription] = useState<string>(
    selectedEvent.description
  );
  const [startDate, setStartDate] = useState<string>(
    selectedEvent.start_date.slice(0, 10)
  );
  const [endDate, setEndDate] = useState<string>(
    selectedEvent.end_date.slice(0, 10)
  );
  const [eventType, setEventType] = useState<EventType>(
    selectedEvent.type as EventType
  );
  const [state, formAction, isPending] = useActionState(editEvent, {});

  const onEventTypeChange = (value: string) => {
    setEventType(value as EventType);
  };

  useEffect(() => {
    if (state.success) {
      toast.success('Event submitted', {
        description: 'Your event has been successfully updated.',
      });
      onEventSubmitted();
    } else if (state.error) {
      toast.error('There was an error updating your event. Please try again.');
    }
  }, [state, onEventSubmitted]);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="eventId" value={selectedEvent.id} />
      <Input
        type="text"
        name="title"
        placeholder="Event Title"
        value={eventTitle}
        onChange={(e) => setEventTitle(e.target.value)}
        required
      />
      <Textarea
        name="description"
        placeholder="Event Description"
        value={eventDescription}
        onChange={(e) => setEventDescription(e.target.value)}
        required
      />
      <div className="flex space-x-2">
        <Input
          type="date"
          name="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <Input
          type="date"
          name="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>
      <Select
        name="category"
        value={eventType}
        onValueChange={onEventTypeChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {EVENT_TYPES.map((type, index) => (
            <SelectItem key={`event-type-${index}`} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex flex-row justify-center gap-4">
        <Button
          variant={'outline'}
          disabled={isPending}
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit Event'}
        </Button>
      </div>
      {state && state.error && (
        <ul className="text-red-500">
          {Object.entries(state.errors || {}).map(([field, errors]) => (
            <li key={field}>
              {field}: {(errors as string[]).join(', ')}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};
