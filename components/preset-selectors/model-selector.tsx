"use client";

import * as React from "react";
import * as z from "zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { PopoverProps } from "@radix-ui/react-popover";
import { UseFormReturn } from "react-hook-form";

import { cn } from "@/lib/utils";
import { useMutationObserver } from "@/hooks/use-mutation-observer";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Model, ModelType } from "@/data/models";
import { playgroundFormSchema } from "@/utils/formSchemas";

interface ModelSelectorProps extends PopoverProps {
  types: readonly ModelType[];
  models: Model[];
  onModelChange: (model: Model) => void;
  form: UseFormReturn<z.infer<typeof playgroundFormSchema>>;
}

export function ModelSelector({
  models,
  types,
  onModelChange,
  form,
  ...props
}: ModelSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedModel, setSelectedModel] = React.useState<Model>(models[0]);
  const [peekedModel, setPeekedModel] = React.useState<Model>(models[0]);

  const { watch } = form;
  const modelVersion = watch("modelVersion");

  React.useEffect(() => {
    const newSelectedModel = models.find((model) => model.id === modelVersion);
    if (newSelectedModel) {
      setSelectedModel(newSelectedModel);
    }
  }, [modelVersion]);

  // Update the selected model both locally and in the parent component
  const handleModelSelect = (model: Model) => {
    setSelectedModel(model);
    onModelChange(model);
    form.setValue("modelVersion", selectedModel.id);
    setOpen(false);
  };

  return (
    <div className="grid gap-2 mb-2 md:-mt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Label htmlFor="model">Model</Label>
        </HoverCardTrigger>
        <HoverCardContent align="start" className="w-[260px] text-sm">
          The model which will generate the image. Each model is suitable for
          specific themes or prompts.
        </HoverCardContent>
      </HoverCard>
      <Popover open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a model"
            className="w-full justify-between"
          >
            {selectedModel ? selectedModel.name : "Select a model..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="popover-content md:w-[260px] p-0"
        >
          <HoverCard>
            <HoverCardContent
              className="hidden md:block"
              align="start"
              forceMount
            >
              <div className="grid gap-2">
                <h4 className="font-medium leading-none">{peekedModel.name}</h4>
                <div className="text-sm text-muted-foreground">
                  {peekedModel.description}
                </div>
                {peekedModel.strengths ? (
                  <div className="mt-4 grid gap-2">
                    <h5 className="text-sm font-medium leading-none">
                      Strengths
                    </h5>
                    <ul className="text-sm text-muted-foreground">
                      {peekedModel.strengths}
                    </ul>
                  </div>
                ) : null}
              </div>
            </HoverCardContent>
            <Command loop>
              <CommandList className="max-h-[400px]">
                <CommandInput placeholder="Search Models..." />
                <CommandEmpty>No Models found.</CommandEmpty>
                <HoverCardTrigger />
                {types.map((type) => (
                  <CommandGroup key={type} heading={"Available to you"}>
                    {models.map((model) => (
                      <ModelItem
                        key={model.id}
                        model={model}
                        isSelected={selectedModel?.id === model.id}
                        onPeek={(model) => setPeekedModel(model)}
                        onSelect={() => handleModelSelect(model)}
                      />
                    ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </HoverCard>
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface ModelItemProps {
  model: Model;
  isSelected: boolean;
  onSelect: () => void;
  onPeek: (model: Model) => void;
}

function ModelItem({ model, isSelected, onSelect, onPeek }: ModelItemProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  useMutationObserver(ref, (mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes") {
        if (mutation.attributeName === "aria-selected") {
          onPeek(model);
        }
      }
    }
  });

  return (
    <CommandItem
      key={model.id}
      onSelect={onSelect}
      ref={ref}
      className="aria-selected:bg-primary aria-selected:text-primary-foreground"
    >
      {model.name}
      <CheckIcon
        className={cn(
          "ml-auto h-4 w-4",
          isSelected ? "opacity-100" : "opacity-0"
        )}
      />
    </CommandItem>
  );
}
