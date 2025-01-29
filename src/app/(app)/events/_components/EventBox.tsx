import { ParsedEvent } from '@/utils/types/events.types';

type EventProps = {
  event: ParsedEvent;
};

export const EventBox = ({ event }: EventProps) => {
  return (
    <>
      <h3 className="font-bold">{event.title}</h3>
      <p className="text-sm text-muted-foreground">
        {`${event.startDate.toLocaleDateString()} - ${event.endDate.toLocaleDateString()}`}
      </p>
      <p className="text-sm text-muted-foreground">{event.type}</p>
      <p className="text-sm mt-2">{event.description}</p>
    </>
  );
};
