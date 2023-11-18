import { useCallback, useRef, useState } from "react";
import { CopyIcon, CheckIcon } from "@radix-ui/react-icons";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function ShareImage({ image }: { image: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopy = useCallback(async (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (inputRef.current) {
      await navigator.clipboard.writeText(inputRef.current.value);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    }
  }, []);
  return (
    <Popover>
      <PopoverTrigger asChild className="absolute top-4 right-4">
        <Button className="p-3">Share</Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[280px] md:w-[450px] backdrop-blur-sm"
      >
        <div className="flex flex-col space-y-2 text-left sm:text-left">
          <h3 className="text-lg font-semibold">Share link</h3>
          <p className="text-sm text-muted-foreground">
            Anyone with this link will be able to view the details of the image.
          </p>
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={image}
              readOnly
              className="h-9"
              ref={inputRef}
            />
          </div>
          <Button type="button" size="sm" className="px-3" onClick={handleCopy}>
            <span className="sr-only">Copy</span>
            {isCopied ? (
              <CheckIcon className="h-4 w-4" />
            ) : (
              <CopyIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
