"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, MotionConfig, useCycle } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

const images = [
  {
    prompt: "A cyberpunk alleyway, tokyo 2050",
    image:
      "https://cdn.sanity.io/images/s3mrlbj8/production/ffcaac7dc8f17e2e300dc12f6951b66a9bb9e470-768x768.png",
  },
  {
    prompt: "Darthouven Fish Men",
    image:
      "https://cdn.sanity.io/images/s3mrlbj8/production/fca5a377252afeecfc2c1c281d4a0aa45579e9f0-768x768.png",
  },
  {
    prompt: "Japanese painting, mountains",
    image:
      "https://cdn.sanity.io/images/s3mrlbj8/production/5be6c4ddbebdc7dfa14b2d0ecc1e61b0f8ea7452-768x768.png",
  },
  {
    prompt: "A cyberpunk alleyway, realism, tokyo 2050",
    image:
      "https://cdn.sanity.io/images/s3mrlbj8/production/27ae7f007dcfd3442ac6051822e6b3430f0f1d6e-1024x1024.png",
  },
  {
    prompt:
      "cloudy sky background lush landscape illustration concept art anime key visual trending pixiv fanbox by wlop and greg rutkowski and makoto shinkai and studio ghibli",
    image:
      "https://cdn.sanity.io/images/s3mrlbj8/production/fe09c29f27a390d09c375fdd8bd117dac1456814-768x768.png",
  },
  {
    prompt: "A cyberpunk alleyway, anime, tokyo 2050",
    image:
      "https://cdn.sanity.io/images/s3mrlbj8/production/293603ea3467f1656330b721d498aacd56d409ee-768x768.png",
  },
];

export function BrandStatement() {
  const [index, cycleIndex] = useCycle(
    ...Array.from(Array(images.length).keys())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      cycleIndex();
    }, 8000); // Change image every 8 seconds (6s display + 1s transition + 1s black overlay)
    return () => clearInterval(interval);
  }, [cycleIndex]);

  return (
    <div className="relative hidden min-h-screen flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div className="absolute inset-0 bg-zinc-900" />
      <Link
        href={"/"}
        className="relative z-20 flex items-center text-xl font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-6 w-6"
        >
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
        Glyph
      </Link>

      <div className="relative h-full w-full max-w-sm xl:max-w-lg mt-40 mx-auto">
        {images.map((image, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{
              duration: 1.0,
              ease: [0.32, 0.72, 0, 1],
              delay: i === index && i !== 0 ? 2.0 : 0, // Delay the fade-in of the new image by 2s, except for the first image
            }}
            className="absolute inset-0"
          >
            <Image
              width={768}
              height={768}
              alt="Glyph"
              src={image.image}
              className="image-gradient"
            />

            <div className="z-20 mt-8">
              <blockquote className="space-y-2">
                <p className="text-lg">&ldquo;{image.prompt}&rdquo;</p>
              </blockquote>
            </div>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: index !== -1 ? 1 : 0 }}
          transition={{
            duration: 1.0,
            ease: [0.32, 0.72, 0, 1],
            delay: 0.5, // Delay the fade-out of the black overlay
          }}
          className="absolute inset-0 bg-black"
        />
      </div>
    </div>
  );
}
