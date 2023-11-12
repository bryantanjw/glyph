"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, MotionConfig, useCycle } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

const images = [
  "https://cdn.sanity.io/images/s3mrlbj8/production/293603ea3467f1656330b721d498aacd56d409ee-768x768.png",
  "https://cdn.sanity.io/images/s3mrlbj8/production/27ae7f007dcfd3442ac6051822e6b3430f0f1d6e-1024x1024.png",
  "https://cdn.sanity.io/images/s3mrlbj8/production/5be6c4ddbebdc7dfa14b2d0ecc1e61b0f8ea7452-768x768.png",
  "https://cdn.sanity.io/images/s3mrlbj8/production/5dec561a5ef3c7ea0892563d2080de1195a38112-1024x1024.jpg",
  "https://cdn.sanity.io/images/s3mrlbj8/production/fca5a377252afeecfc2c1c281d4a0aa45579e9f0-768x768.png",
  "https://cdn.sanity.io/images/s3mrlbj8/production/ffcaac7dc8f17e2e300dc12f6951b66a9bb9e470-768x768.png",
];

export function BrandStatement() {
  const [index, cycleIndex] = useCycle(
    ...Array.from(Array(images.length).keys())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      cycleIndex();
    }, 15000); // Change image every 15 seconds (10s display + 1s transition + 4s black overlay)
    return () => clearInterval(interval);
  }, [cycleIndex]);

  return (
    <div className="relative hidden min-h-screen flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div className="absolute inset-0 bg-zinc-900" />
      <Link
        href={"/"}
        className="relative z-20 flex items-center text-lg font-medium"
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

      <div className="relative h-full w-full max-w-sm xl:max-w-lg mt-32 2xl:mt-40 mx-auto">
        {images.map((image, i) => (
          <motion.div
            key={image}
            initial={{ opacity: 0 }}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{
              duration: 1.0, // Decrease duration here for 1s transition
              ease: [0.32, 0.72, 0, 1],
              delay: i === index ? 4.0 : 0, // Delay the fade-in of the new image
            }}
            className="absolute inset-0"
          >
            <Image
              width={768}
              height={768}
              alt="Glyph"
              src={image}
              className="image-gradient"
            />
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: index !== -1 ? 1 : 0 }}
          transition={{
            duration: 1.0, // Decrease duration here for 1s transition
            ease: [0.32, 0.72, 0, 1],
            delay: 0.5, // Delay the fade-out of the black overlay
          }}
          className="absolute inset-0 bg-black"
        />
      </div>

      <div className="relative z-20 mt-auto">
        <blockquote className="space-y-2">
          <p className="text-lg">
            &ldquo;With Glyph, my QR codes have transformed from bland to
            brilliant! They not only scan perfectly but also beautifully align
            with my brand&apos;s aesthetics.&rdquo;
          </p>
          <footer className="text-sm">Sofia Davis</footer>
        </blockquote>
      </div>
    </div>
  );
}
