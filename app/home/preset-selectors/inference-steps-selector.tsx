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

interface InferenceStepsSelectorProps {
  defaultValue: SliderProps["defaultValue"];
}

export function InferenceStepsSelector({
  defaultValue,
}: InferenceStepsSelectorProps) {
  const [value, setValue] = React.useState([50]);

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="inferenceSteps" className="leading-[1.5]">
                Inference Steps
              </Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {value}
              </span>
            </div>
            <Slider
              id="inferenceSteps"
              max={100}
              defaultValue={value}
              step={2}
              onValueChange={setValue}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="Inference Steps"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          Number of denoising steps (minimum: 1; maximum: 500).
          <br /> <br /> Decrease to have the initial composition follows the QR
          code more. You will only see the QR code if you reduce it too much.
          The range of steps varies by model.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
