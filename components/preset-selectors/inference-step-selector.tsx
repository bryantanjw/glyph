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

import { formSchema } from "@/schemas/formSchemas";
import { useSliderChange } from "@/hooks/use-slider-change";

interface InferenceStepSelectorProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export function InferenceStepSelector({ form }: InferenceStepSelectorProps) {
  const { value, handleSliderChange } = useSliderChange(form, "inferenceStep");

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="inferenceStep" className="leading-[1.5]">
                Inference Step
              </Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {value}
              </span>
            </div>
            <Slider
              id="inferenceStep"
              max={100}
              value={[value]}
              step={2}
              onValueChange={handleSliderChange}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="Inference Step"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent align="start" className="w-[260px] text-sm">
          Number of denoising steps (minimum: 1; maximum: 100).
          <br /> <br /> Decrease to have the initial composition follows the QR
          code more. You will only see the QR code if you reduce it too much.
          The range of steps varies by model.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
