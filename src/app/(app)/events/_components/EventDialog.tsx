import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ParsedEvent } from '@/utils/types/events.types';
import { AddEventForm } from '../_forms/addEvent';
import { EditEventForm } from '../_forms/editEvent';
import { EventBox } from './EventBox';

export type DialogType = '' | 'add' | 'edit' | 'delete' | 'view';

type EventDialogProps = {
  type: DialogType;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  event: ParsedEvent | null;
  handleEventSubmit: () => void;
  handleDeleteClick: (id: number) => void;
  selectedDate: Date | null;
  selectedDateEvents: ParsedEvent[];
};

export const EventDialog = ({
  type,
  isOpen,
  setIsOpen,
  event,
  handleEventSubmit,
  handleDeleteClick,
  selectedDate,
  selectedDateEvents,
}: EventDialogProps) => {
  if (type === 'add') {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new event to the calendar.
            </DialogDescription>
          </DialogHeader>
          <AddEventForm
            onEventSubmitted={handleEventSubmit}
            setIsOpen={setIsOpen}
          />
        </DialogContent>
      </Dialog>
    );
  }

  if (type === 'edit') {
    return (
      event && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new event to the calendar.
              </DialogDescription>
            </DialogHeader>
            <EditEventForm
              selectedEvent={event}
              onEventSubmitted={handleEventSubmit}
              setIsOpen={setIsOpen}
            />
          </DialogContent>
        </Dialog>
      )
    );
  }

  if (type === 'delete') {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              {`Are you sure you wish to delete this event?`}
            </DialogDescription>
          </DialogHeader>
          {event && (
            <>
              <div className="p-4 border rounded">
                <EventBox event={event} />
              </div>
              <div className="flex flex-row justify-center gap-4">
                <Button
                  variant={'outline'}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant={'destructive'}
                  onClick={() => {
                    handleDeleteClick(event.id);
                  }}
                >
                  Delete
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Events for {selectedDate?.toLocaleDateString()}
          </DialogTitle>
          <DialogDescription>
            All events scheduled for this date:
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-96 pr-4">
          <div className="mt-4 space-y-4">
            {selectedDateEvents.map((event) => (
              <div key={event.id} className="p-4 border rounded">
                <EventBox event={event} />
              </div>
            ))}
          </div>
        </ScrollArea>
        <Button
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};
