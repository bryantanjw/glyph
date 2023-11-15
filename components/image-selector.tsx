"use client";

import * as React from "react";
import {
  CaretSortIcon,
  CheckIcon,
  Cross2Icon,
  TrashIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
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
import Image from "next/image";
import { Icons } from "./ui/icons";

interface ImageSelectorProps extends PopoverProps {
  file: File | null;
  setFile: (file: File) => void;
  onSelect: (image: ExampleImage) => void;
  selectedImage: ExampleImage | null;
  setSelectedImage: (image: ExampleImage) => void;
  userDetails?: any;
  form: any;
}

export function ImageSelector({
  file,
  setFile,
  selectedImage,
  setSelectedImage,
  userDetails,
  form,
  ...props
}: ImageSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState(null);

  const noCredits = userDetails?.credits <= 0;

  const handleDelete = (fileName: string) => {
    setFile(null);
    setSelectedImage(null);
    form.setValue("image", "");
  };

  const formatNumberWithDots = (number: number): string => {
    let size = number / 1024; // Convert bytes to KB
    let unit = "KB";

    if (size > 1024) {
      size = size / 1024; // Convert KB to MB if size > 1024 KB
      unit = "MB";
    }

    const roundedSize = Number(size.toFixed(1));
    return `${roundedSize} ${unit}`;
  };

  const generatePreview = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const simulateLoading = (file: File) => {
    const duration = Math.max(1000, Math.min(file.size / 750, 4000));

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, duration);
  };

  React.useEffect(() => {
    if (isLoading === false && file) {
      generatePreview(file);
      simulateLoading(file);
    }
  }, [file]);

  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor="input">Image / QR code</Label>
      {file ? (
        <div className="w-full py-2 gap-2 flex flex-col justify-start items-center max-h-52 overflow-auto">
          <div className="flex flex-row justify-between items-center border dark:border-neutral-700 rounded-md shadow-sm px-2 py-1 w-full group">
            <div className="flex flex-row justify-start items-center gap-2">
              <div>
                {isLoading ? (
                  <div className="flex flex-row justify-center items-center gap-2 h-10 w-10 border rounded-md">
                    <Icons.spinner className="h-4 w-4 animate-spin text-neutral-500" />
                  </div>
                ) : (
                  previewImage && (
                    <div className="relative h-10 w-10">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        layout="fill"
                        className="rounded-md h-full w-full border"
                        objectFit="cover"
                      />
                    </div>
                  )
                )}
              </div>
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="flex flex-row justify-start items-center gap-2">
                  <p className="text-sm">{file.name}</p>
                  {!isLoading && (
                    <div className="flex flex-row justify-start items-center text-xs rounded-full px-2 py-[0.5px] gap-1">
                      <div className="h-2 w-2 bg-green-400 rounded-full" />
                      <p className="text-neutral-500">Uploaded</p>
                    </div>
                  )}
                </div>
                <p className="text-xs text-neutral-500">
                  {formatNumberWithDots(file.size)}
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-end items-center gap-2">
              <button
                className="flex flex-row justify-end p-2 mr-1 rounded-md opacity-40 hover:opacity-70 transition-all hover:cursor-pointer"
                onClick={() => handleDelete(file.name)}
              >
                <Cross2Icon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-label="Load a preset..."
              aria-expanded={open}
              className="flex-1 justify-between"
            >
              {selectedImage ? selectedImage.name : "Choose image..."}
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
                            const file = event.target.files[0];
                            const maxSizeInBytes = 50 * 1024 * 1024; // Maximum uploaded file size is 50MB

                            if (file.size > maxSizeInBytes) {
                              alert(
                                "File size exceeds the maximum limit of 50MB"
                              );
                              return;
                            }

                            setFile(file);
                            setSelectedImage(null);
                            // Update form value for "image" field
                            form.setValue("image", file.name);
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
      )}
    </div>
  );
}
