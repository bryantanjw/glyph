"use client";

import * as React from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function SeedField() {
  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="Seed" className="leading-[1.5]">
                Seed
              </Label>
            </div>
            <Input type="number" value={5} readOnly />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          A parameter that introduces a degree of randomness or entropy into the
          model&apos;s output. <br />
          <br />
          This ensures a diverse range of outputs from the model, preventing it
          from consistently generating similar themes. It serves as a mechanism
          to control the unpredictability of the model&apos;s output.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
