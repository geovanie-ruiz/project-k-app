'use client';

import { Button } from '@/components/ui/button';
import { EventType, ParsedEvent } from '@/utils/types/events.types';
import { useUser } from '@clerk/nextjs';
import { useMediaQuery } from '@react-hook/media-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { deleteEvent } from '../_actions';
import { useCalendar } from '../_hooks/useCalendar';
import { CalendarSkeleton } from './CalendarSkeleton';
import CalendarView from './CalendarView';
import { DialogType, EventDialog } from './EventDialog';
import EventList from './EventList';
import { FilterComponent } from './FilterComponent';
import { FilterDropdown } from './FilterDropdown';

export const Calendar = () => {
  const { isSignedIn } = useUser();

  const {
    eventsForSelectedYear,
    upcomingEvents,
    selectedFilters,
    fetchEventsForYear,
    selectedYear,
    setSelectedYear,
    isLoading,
    handleFilterChange,
    removeEvent,
  } = useCalendar();
  const [isOpen, setIsOpen] = useState(false);
  const [dialogType, setDialogType] = useState<DialogType>('');

  const [scrollToDate, setScrollToDate] = useState<Date | undefined>(undefined);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<ParsedEvent | null>(null);
  const [selectedDateEvents, setSelectedDateEvents] = useState<ParsedEvent[]>(
    []
  );

  const eventListRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleEventSubmit = useCallback(async () => {
    setIsOpen(false);
    setDialogType('');
    if (selectedEvent) {
      removeEvent(selectedEvent.id);
    }
    fetchEventsForYear(selectedYear);
  }, [selectedEvent, selectedYear, fetchEventsForYear, removeEvent]);

  const handleEventClick = useCallback(
    (event: ParsedEvent) => {
      setScrollToDate(new Date(event.startDate));
      setSelectedMonth(new Date(event.startDate).getMonth());
      setSelectedYear(new Date(event.startDate).getFullYear());
    },
    [setSelectedYear]
  );

  const handleMoreClick = useCallback(
    (date: Date) => {
      setSelectedDate(date);
      const eventsOnSelectedDate = eventsForSelectedYear.filter(
        (event) =>
          event.startDate.toDateString() === date.toDateString() ||
          (event.startDate <= date && event.endDate >= date)
      );
      setSelectedDateEvents(eventsOnSelectedDate);
      setDialogType('view');
      setIsOpen(true);
    },
    [eventsForSelectedYear]
  );

  const handleYearChange = useCallback(
    (year: number) => {
      setSelectedYear(year);
      fetchEventsForYear(year);
    },
    [setSelectedYear, fetchEventsForYear]
  );

  const handleDeleteClick = useCallback(
    async (eventId: number) => {
      const result = await deleteEvent(eventId);
      if (result.success) {
        toast.success('Event deleted', {
          description: 'The event has been successfully deleted.',
        });
        setIsOpen(false);
        setDialogType('');
        if (selectedEvent) {
          removeEvent(selectedEvent.id);
        }
        fetchEventsForYear(selectedYear);
      } else {
        toast.error('There was an error deleting the event. Please try again.');
      }
    },
    [selectedEvent, selectedYear, fetchEventsForYear, removeEvent]
  );

  const handleEventDelete = useCallback(async (event: ParsedEvent) => {
    setSelectedEvent(event);
    setDialogType('delete');
    setIsOpen(true);
  }, []);

  const handleEventEdit = useCallback(async (event: ParsedEvent) => {
    setSelectedEvent(event);
    setDialogType('edit');
    setIsOpen(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (eventListRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = eventListRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 20) {
          // Load more events if needed
        }
      }
    };

    const currentEventList = eventListRef.current;
    if (currentEventList) {
      currentEventList.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentEventList) {
        currentEventList.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const filteredUpcomingEvents = upcomingEvents.filter((event) =>
    selectedFilters.includes(event.type as EventType)
  );

  const filteredCalendarEvents = eventsForSelectedYear.filter((event) =>
    selectedFilters.includes(event.type as EventType)
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Community Calendar</h1>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {isMobile ? (
          <FilterDropdown
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
          />
        ) : (
          <FilterComponent
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
          />
        )}
        {isSignedIn && (
          <Button
            onClick={() => {
              setDialogType('add');
              setIsOpen(true);
            }}
          >
            Add New Event
          </Button>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-4 my-4">
        <div className="w-full md:w-1/3" ref={eventListRef}>
          <EventList
            events={filteredUpcomingEvents}
            onEventClick={handleEventClick}
            onEventEdit={handleEventEdit}
            onEventDelete={handleEventDelete}
            scrollToDate={scrollToDate}
            isLoading={isLoading}
          />
        </div>
        {!isMobile && (
          <div className="w-full md:w-2/3">
            {isLoading ? (
              <CalendarSkeleton />
            ) : (
              <CalendarView
                events={filteredCalendarEvents}
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
                onYearChange={handleYearChange}
                onMonthChange={setSelectedMonth}
                onMoreClick={handleMoreClick}
              />
            )}
          </div>
        )}
      </div>
      <EventDialog
        type={dialogType}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        event={selectedEvent}
        handleEventSubmit={handleEventSubmit}
        handleDeleteClick={handleDeleteClick}
        selectedDate={selectedDate}
        selectedDateEvents={selectedDateEvents}
      />
    </div>
  );
};
