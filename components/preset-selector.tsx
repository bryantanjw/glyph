"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { PopoverProps } from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Preset, presets } from "@/data/presets";

interface PresetSelectorProps extends PopoverProps {
  onSelect: (preset: Preset) => void;
  selectedPreset: Preset | null;
}

export function PresetSelector({
  selectedPreset,
  ...props
}: PresetSelectorProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Load a preset..."
          aria-expanded={open}
          className="flex-1 justify-between"
        >
          {selectedPreset ? selectedPreset.name : "Load a preset..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="popover-content w-[300px] p-0" align="start">
        <Command loop>
          <CommandList>
            <CommandInput placeholder="Search presets..." />
            <CommandEmpty>No presets found.</CommandEmpty>
            <ScrollArea className="h-[170px]">
              <CommandGroup heading="Examples">
                {presets.map((preset) => (
                  <CommandItem
                    key={preset.id}
                    onSelect={() => {
                      props.onSelect(preset);
                      setOpen(false);
                    }}
                  >
                    {preset.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedPreset?.id === preset.id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
