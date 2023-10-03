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

interface ExampleImage {
  name: string;
  url: string;
}

export const exampleImages: ExampleImage[] = [
  {
    name: "https://glyph.so",
    url: "https://1hhwy54cedxlm3yh.public.blob.vercel-storage.com/Glyph_QR-jPjQUqTP5VN05X9jLsv0PZWX7TAgeA.png",
  },
  {
    name: "Spiral",
    url: "https://1hhwy54cedxlm3yh.public.blob.vercel-storage.com/Spiral-L4I9BVYlhyozp4BpQnw8xUT2JmGLVw.png",
  },
  {
    name: "2x2 Checkered Box",
    url: "https://1hhwy54cedxlm3yh.public.blob.vercel-storage.com/Checkered_2x2-3NgtTA8ypxh8y0lRmCKtbOmsFc7lds.png",
  },
  {
    name: "4x4 Checkered Box",
    url: "https://1hhwy54cedxlm3yh.public.blob.vercel-storage.com/Checkered_4x4-w7j0zRNh2MPgtzQYbSHjYeyagtFLbS.png",
  },
];

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
