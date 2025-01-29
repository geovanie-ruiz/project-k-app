'use client';

import { Button } from '@/components/ui/button';
import { EVENT_TYPES, EventType } from '@/utils/types/events.types';

interface FilterComponentProps {
  selectedFilters: EventType[];
  onFilterChange: (filters: EventType[]) => void;
}

export const FilterComponent = ({
  selectedFilters,
  onFilterChange,
}: FilterComponentProps) => {
  const handleFilterClick = (eventType: EventType) => {
    if (selectedFilters.includes(eventType)) {
      onFilterChange(selectedFilters.filter((filter) => filter !== eventType));
    } else {
      onFilterChange([...selectedFilters, eventType]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {EVENT_TYPES.map((eventType) => (
        <Button
          key={eventType}
          variant={selectedFilters.includes(eventType) ? 'default' : 'outline'}
          className={
            selectedFilters.includes(eventType)
              ? 'bg-primary text-primary-foreground font-bold'
              : ''
          }
          onClick={() => handleFilterClick(eventType)}
        >
          {eventType}
        </Button>
      ))}
    </div>
  );
};
