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

interface BrightnessConditioningSelectorProps {
  defaultValue: SliderProps["defaultValue"];
}

export function BrightnessConditioningSelector({
  defaultValue,
}: BrightnessConditioningSelectorProps) {
  const [value, setValue] = React.useState([0.45]);

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="brightnessConditioning" className="leading-[1.5]">
                Brightness Conditioning
              </Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {value}
              </span>
            </div>
            <Slider
              id="brightnessConditioning"
              max={1}
              defaultValue={value}
              step={0.01}
              onValueChange={setValue}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="Brightness Conditioning"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          Adjust the brightness of the image.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
