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

import { playgroundFormSchema } from "@/schemas/formSchemas";
import { useSliderChange } from "@/hooks/use-slider-change";

interface ControlNetConditioningSelectorProps {
  form: UseFormReturn<z.infer<typeof playgroundFormSchema>>;
}

export function ControlNetConditioningSelector({
  form,
}: ControlNetConditioningSelectorProps) {
  const { value, handleSliderChange } = useSliderChange(
    form,
    "controlnetConditioning"
  );

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="ControlNetConditioning" className="leading-[1.5]">
                Control Weight
              </Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {value}
              </span>
            </div>
            <Slider
              id="ControlNetConditioning"
              max={4}
              min={1}
              value={[value]}
              step={0.05}
              onValueChange={handleSliderChange}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="ControlNet Conditioning"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent align="start" className="w-[260px] text-sm">
          Adjust how readable you want the QR code or image to be. (minimum: 1;
          maximum: 4)
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
