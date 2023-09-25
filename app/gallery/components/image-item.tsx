"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Image = {
  image: string;
  alt: string;
  ar: string;
};

export default function ImageItem({ image, alt, ar }: Image) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Dialog>
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
      <DialogContent className="max-w-2xl">
        <figure className={clsx("aspect-square")}>
          <Image loading={"eager"} alt={alt} src={image} quality={100} />
        </figure>
      </DialogContent>
    </Dialog>
  );
}
