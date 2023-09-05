"use client";

import * as React from "react";
import * as z from "zod";
import { UseFormReturn } from "react-hook-form";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

import { formSchema } from "@/app/page";
import { useSliderChange } from "@/hooks/use-slider-change";

interface StrengthSelectorProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export function StrengthSelector({ form }: StrengthSelectorProps) {
  const { value, handleSliderChange } = useSliderChange(form, "strength");

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="Strength" className="leading-[1.5]">
                Strength
              </Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {value}
              </span>
            </div>
            <Slider
              id="strength"
              max={30}
              defaultValue={[value]}
              step={0.2}
              onValueChange={handleSliderChange}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="Strength"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          Indicator for how much to transform the masked portion of the
          reference `image`. Must be between 0 and 1. (maximum: 1)
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
