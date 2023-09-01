"use client";

import * as React from "react";
import { SliderProps } from "@radix-ui/react-slider";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function NegativePromptField() {
  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="Negative Prompt" className="leading-[1.5]">
                Negative Prompt
              </Label>
            </div>
            <Textarea
              readOnly
              value={"ugly, disfigured, low quality, blurry, nsfw"}
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          A feature that allows the model to understand what it should not
          generate. It&apos;s a way to guide the model&apos;s output away from
          certain themes or topics.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
