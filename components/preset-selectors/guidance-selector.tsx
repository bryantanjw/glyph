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

import { playgroundFormSchema } from "@/utils/formSchemas";
import { useSliderChange } from "@/hooks/use-slider-change";

interface GuidanceSelectorProps {
  form: UseFormReturn<z.infer<typeof playgroundFormSchema>>;
}

export function GuidanceSelector({ form }: GuidanceSelectorProps) {
  const { value, handleSliderChange } = useSliderChange(form, "guidance");

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="Guidance" className="leading-[1.5]">
                Guidance
              </Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {value}
              </span>
            </div>
            <Slider
              id="guidance"
              max={30}
              min={0.5}
              value={[value]}
              step={0.1}
              onValueChange={handleSliderChange}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="Guidance"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent align="start" className="w-[260px] text-sm">
          Adjust how much the output should follow your prompt. (minimum: 0.5;
          maximum: 30).
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
