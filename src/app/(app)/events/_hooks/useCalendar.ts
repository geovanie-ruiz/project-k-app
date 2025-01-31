'use client';

import {
  EVENT_TYPES,
  EventType,
  type ParsedEvent,
} from '@/utils/types/events.types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getEvents } from '../_utils/getEvents';

// At some point it'll be nice to remember filter preferences
let userProfile = {
  selectedFilters: EVENT_TYPES,
};

const getUserProfile = () => {
  return userProfile;
};

const updateUserProfile = (newFilters: EventType[]) => {
  userProfile = { ...userProfile, selectedFilters: newFilters };
};

export const useCalendar = () => {
  const [events, setEvents] = useState<ParsedEvent[]>([]);
  const [loadedYears, setLoadedYears] = useState<number[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<EventType[]>(
    getUserProfile().selectedFilters
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [isLoading, setIsLoading] = useState(true);

  const fetchEventsForYear = useCallback(
    async (year: number) => {
      if (loadedYears.includes(year)) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31);

      const newEvents = await getEvents(EVENT_TYPES, startDate, endDate);

      setEvents((prevEvents) => {
        const uniqueNewEvents = newEvents.filter(
          (newEvent) =>
            !prevEvents.some(
              (existingEvent) => existingEvent.id === newEvent.id
            )
        );
        return [...prevEvents, ...uniqueNewEvents];
      });

      setLoadedYears((prevYears) => [...prevYears, year]);
      setIsLoading(false);
    },
    [loadedYears]
  );

  const removeEvent = async (eventId: number) => {
    const eventRemoved = events.filter((event) => event.id !== eventId);
    setEvents(eventRemoved);
  };

  useEffect(() => {
    fetchEventsForYear(selectedYear);
  }, [fetchEventsForYear, selectedYear]);

  const handleFilterChange = useCallback((newFilters: EventType[]) => {
    setSelectedFilters(newFilters);
    updateUserProfile(newFilters);
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) =>
      selectedFilters.includes(event.type as EventType)
    );
  }, [events, selectedFilters]);

  const eventsForSelectedYear = useMemo(() => {
    return filteredEvents.filter(
      (event) => event.startDate.getFullYear() === selectedYear
    );
  }, [filteredEvents, selectedYear]);

  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return filteredEvents
      .filter((event) => event.startDate >= now)
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  }, [filteredEvents]);

  return {
    events,
    eventsForSelectedYear,
    upcomingEvents,
    selectedFilters,
    fetchEventsForYear,
    selectedYear,
    setSelectedYear,
    isLoading,
    handleFilterChange,
    removeEvent,
  };
};
