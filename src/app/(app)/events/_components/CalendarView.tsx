'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ParsedEvent } from '@/utils/types/events.types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface CalendarViewProps {
  events: ParsedEvent[];
  selectedYear: number;
  selectedMonth: number;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  onMoreClick: (date: Date) => void;
}

const CalendarView = ({
  events,
  selectedYear,
  selectedMonth,
  onYearChange,
  onMonthChange,
  onMoreClick,
}: CalendarViewProps) => {
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  const today = useMemo(() => new Date(), []);

  useEffect(() => {
    const days = [];
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1);
    const lastDayOfMonth = new Date(selectedYear, selectedMonth + 1, 0);

    // Add padding days for the start of the month
    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
      const paddingDay = new Date(selectedYear, selectedMonth, -i);
      days.unshift(paddingDay);
    }

    // Add all days of the month
    for (
      let date = new Date(firstDayOfMonth);
      date <= lastDayOfMonth;
      date.setDate(date.getDate() + 1)
    ) {
      days.push(new Date(date));
    }

    // Add padding days for the end of the month
    const remainingDays = 7 - (days.length % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        const paddingDay = new Date(selectedYear, selectedMonth + 1, i);
        days.push(paddingDay);
      }
    }

    setCalendarDays(days);
  }, [selectedYear, selectedMonth]);

  const getEventsForDate = useCallback(
    (date: Date) => {
      return events.filter((event) => {
        const eventStart = new Date(event.startDate);
        const eventEnd = new Date(event.endDate);
        return (
          (eventStart <= date && eventEnd >= date) ||
          (eventStart.getFullYear() === date.getFullYear() &&
            eventStart.getMonth() === date.getMonth() &&
            eventStart.getDate() === date.getDate())
        );
      });
    },
    [events]
  );

  const renderEventBox = useCallback(
    (date: Date) => {
      const dateEvents = getEventsForDate(date);
      const displayEvents = dateEvents.slice(0, 3);
      const remainingEvents = dateEvents.length - 3;

      return (
        <ScrollArea className="h-24">
          {displayEvents.map((event) => (
            <TooltipProvider key={event.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-xs p-1 mb-1 bg-primary/10 rounded cursor-pointer">
                    {event.title}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{event.description}</p>
                  <p>{`${event.startDate.toLocaleDateString()} - ${event.endDate.toLocaleDateString()}`}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
          {remainingEvents > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs w-full"
              onClick={() => onMoreClick(date)}
            >
              {`+${remainingEvents} more`}
            </Button>
          )}
        </ScrollArea>
      );
    },
    [getEventsForDate, onMoreClick]
  );

  const isToday = useCallback(
    (date: Date) => {
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    },
    [today]
  );

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {new Date(selectedYear, selectedMonth).toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              if (selectedMonth === 0) {
                onMonthChange(11);
                onYearChange(selectedYear - 1);
              } else {
                onMonthChange(selectedMonth - 1);
              }
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              if (selectedMonth === 11) {
                onMonthChange(0);
                onYearChange(selectedYear + 1);
              } else {
                onMonthChange(selectedMonth + 1);
              }
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-bold">
            {day}
          </div>
        ))}
        {calendarDays.map((day) => (
          <div
            key={`${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`}
            className={`border rounded p-1 ${day.getMonth() !== selectedMonth ? 'bg-muted' : ''} 
              ${isToday(day) ? 'bg-primary/20 border-primary' : ''}`}
          >
            <div className="text-right text-sm">{day.getDate()}</div>
            {renderEventBox(day)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
