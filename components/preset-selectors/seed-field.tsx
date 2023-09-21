"use client";

import * as React from "react";
import * as z from "zod";
import { Controller, UseFormReturn } from "react-hook-form";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";

import { playgroundFormSchema } from "@/schemas/formSchemas";

interface SeedFieldProps {
  form: UseFormReturn<z.infer<typeof playgroundFormSchema>>;
}

export function SeedField({ form }: SeedFieldProps) {
  const {
    control,
    formState: { errors },
  } = form;

  React.useEffect(() => {
    if (errors.seed) {
      console.log(errors.seed.message);
    }
  }, [errors.seed]);

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
            <Controller
              name="seed"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage>{errors.seed?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent align="start" className="w-[260px] text-sm">
          A parameter that introduces a degree of randomness or entropy into the
          model&apos;s output. Set to -1 to randomize the seed.
          <br />
          <br />
          This ensures a diverse range of outputs from the model, preventing it
          from consistently generating similar themes. It serves as a mechanism
          to control the unpredictability of the model&apos;s output.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
