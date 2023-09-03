"use client";

import * as React from "react";
import { SliderProps } from "@radix-ui/react-slider";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface ControlNetConditioningSelectorProps {
  defaultValue: SliderProps["defaultValue"];
}

export function ControlNetConditioningSelector({
  defaultValue,
}: ControlNetConditioningSelectorProps) {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="ControlNetConditioning" className="leading-[1.5]">
                ControlNet Conditioning
              </Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {value}
              </span>
            </div>
            <Slider
              id="ControlNetConditioning"
              max={2}
              min={1}
              defaultValue={value}
              step={0.01}
              onValueChange={setValue}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="ControlNet Conditioning"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          Adjust the properties of the tile/grid.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
