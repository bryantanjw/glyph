"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon, UploadIcon } from "@radix-ui/react-icons";
import { PopoverProps } from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

import { ExampleImage, exampleImages } from "@/data/presets";

interface ImageSelectorProps extends PopoverProps {
  file: File | null;
  setFile: (file: File) => void;
  onSelect: (image: ExampleImage) => void;
  selectedImage: ExampleImage | null;
  setSelectedImage: (image: ExampleImage) => void;
  userDetails?: any;
}

export function ImageSelector({
  file,
  setFile,
  selectedImage,
  setSelectedImage,
  userDetails,
  ...props
}: ImageSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const noCredits = userDetails?.credits <= 0;

  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor="input">Image / QR code</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-label="Load a preset..."
            aria-expanded={open}
            className="flex-1 justify-between"
          >
            {file
              ? file.name
              : selectedImage
              ? selectedImage.name
              : "Choose image..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <Command loop>
            <CommandList>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="w-full">
                    <CommandItem className="m-1 mb-0">
                      <Input
                        type="file"
                        id="fileInput"
                        className="hidden"
                        onChange={(event) => {
                          setFile(event.target.files[0]);
                          setSelectedImage(null);
                        }}
                      />
                      <Button
                        className="p-0 h-5 font-normal flex justify-between items-center w-full"
                        variant="ghost"
                        disabled={noCredits}
                        onClick={() => {
                          document.getElementById("fileInput").click();
                        }}
                      >
                        Upload your own image
                        <UploadIcon className="h-4 w-4 shrink-0" />
                      </Button>
                    </CommandItem>
                  </TooltipTrigger>
                  {noCredits && (
                    <TooltipContent side="right">
                      Add credits to upload your own image
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>

              <ScrollArea className="h-full">
                <CommandGroup heading="Examples">
                  {exampleImages.map((image) => (
                    <CommandItem
                      key={image.name}
                      onSelect={() => {
                        props.onSelect(image);
                        setFile(null);
                        setOpen(false);
                      }}
                    >
                      {image.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedImage?.name === image.name && file === null
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </ScrollArea>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
