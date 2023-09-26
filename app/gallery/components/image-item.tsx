"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Icons } from "@/components/ui/icons";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState, Suspense } from "react";

type Image = {
  image: string;
  alt: string;
  ar: string;
};

export default function ImageItem({ image, alt, ar }: Image) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) {
          setIsLoading(true);
        }
      }}
    >
      <figure
        className={clsx(
          "group relative mb-4 overflow-hidden rounded bg-neutral-two dark:bg-neutral-nine",
          "md:mb-4",
          "lg:mb-8",
          "aspect-square"
        )}
      >
        <DialogTrigger>
          <Image
            fill={true}
            loading={ar === "medium" ? "eager" : "lazy"}
            priority={ar === "medium" ? true : false}
            sizes="(min-width: 66em) 33vw, (min-width: 44em) 50vw, 100vw"
            alt={alt}
            src={image}
            className={clsx(
              "object-cover duration-700 ease-in-out group-hover:cursor-pointer group-hover:opacity-80",
              isLoading
                ? "scale-120 blur-3xl grayscale"
                : "scale-100 blur-0 grayscale-0"
            )}
            onLoadingComplete={() => setIsLoading(false)}
          />
        </DialogTrigger>
      </figure>
      <style>
        {`
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              50%, 100% { /* Adjust this percentage to control the speed of rotation */
                transform: rotate(180deg);
              }
            }
          `}
      </style>
      <DialogContent className="max-w-2xl">
        <figure className={"aspect-square"}>
          <Image
            loading={"lazy"}
            alt={alt}
            src={image}
            fill={true}
            quality={100}
            onLoadingComplete={() => setIsLoading(false)}
            className={clsx(
              "object-cover duration-700 ease-in-out",
              isLoading
                ? "scale-120 blur-3xl grayscale"
                : "scale-100 blur-0 grayscale-0"
            )}
          />
        </figure>

        <Link
          href={image}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-12 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <ExternalLinkIcon className="h-4 w-4" />
          <span className="sr-only">External Link</span>
        </Link>
      </DialogContent>
    </Dialog>
  );
}
