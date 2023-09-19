"use client";

import clsx from "clsx";

import { Suspense } from "react";
import ImageItem from "./image-item";
import { Icons } from "@/components/ui/icons";
import { ImageDataType } from "@/sanity/types/ImageDataType";

export default function ImageGrid({ data }: { data: ImageDataType[] }) {
  return (
    <Suspense
      fallback={
        <div className="mt-12 flex flex-col items-center justify-center">
          <p className="text-sm text-neutral-seven dark:text-neutral-four">
            Loading...
          </p>
          <span className="sr-only">Loading</span>
          <Icons.spinner className="animate-spin-fast stroke-neutral-seven stroke-[1.5] dark:stroke-neutral-four" />
        </div>
      }
    >
      <main
        className={clsx(
          "mt-8 columns-1 gap-x-6 gap-y-6",
          "md:columns-2",
          "lg:columns-3 lg:gap-x-8"
        )}
      >
        {data.map(({ _id, imageUrl, alt, ratio }) => (
          <ImageItem key={_id} image={imageUrl} alt={alt} ar={ratio} />
        ))}
      </main>
    </Suspense>
  );
}
