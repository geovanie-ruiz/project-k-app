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
import { EVENT_TYPES, EventType } from '@/utils/types/events.types';
import { useActionState, useEffect, useState } from 'react';
import { createEvent } from '../_actions';

import { toast } from 'sonner';

type EventSubmissionFormProps = {
  onEventSubmitted: () => void;
  setIsOpen: (open: boolean) => void;
};

export const AddEventForm = ({
  onEventSubmitted,
  setIsOpen,
}: EventSubmissionFormProps) => {
  const [eventTitle, setEventTitle] = useState<string>('');
  const [eventDescription, setEventDescription] = useState<string>('');
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [endDate, setEndDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [eventType, setEventType] = useState<EventType>(EventType.COMMUNITY);
  const [state, formAction, isPending] = useActionState(createEvent, {});

  const onEventTypeChange = (value: string) => {
    setEventType(value as EventType);
  };

  useEffect(() => {
    if (state.success) {
      toast.success('Event submitted', {
        description: 'Your event has been successfully added to the calendar.',
      });
      onEventSubmitted();
    } else if (state.error) {
      toast.error(
        'There was an error submitting your event. Please try again.'
      );
    }
  }, [state, onEventSubmitted]);

  return (
    <form action={formAction} className="space-y-4">
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
          {isPending ? 'Submitting...' : 'Submit for Approval'}
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
