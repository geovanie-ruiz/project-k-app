'use client';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { EVENT_TYPES, EventType } from '@/utils/types/events.types';
import { cn } from '@/utils/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

interface FilterDropdownProps {
  selectedFilters: EventType[];
  onFilterChange: (filters: EventType[]) => void;
}

export function FilterDropdown({
  selectedFilters,
  onFilterChange,
}: FilterDropdownProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (category: EventType) => {
    if (selectedFilters.includes(category)) {
      onFilterChange(selectedFilters.filter((filter) => filter !== category));
    } else {
      onFilterChange([...selectedFilters, category]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedFilters.length === EVENT_TYPES.length
            ? 'All event types'
            : `${selectedFilters.length} types selected`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search event types..." />
          <CommandList>
            <CommandEmpty>No event type found.</CommandEmpty>
            <CommandGroup>
              {EVENT_TYPES.map((eventType) => (
                <CommandItem
                  key={eventType}
                  onSelect={() => handleSelect(eventType)}
                  className={
                    selectedFilters.includes(eventType)
                      ? 'bg-primary text-primary-foreground font-bold'
                      : ''
                  }
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedFilters.includes(eventType)
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {eventType}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
