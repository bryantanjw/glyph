"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Hero() {
  return (
    <motion.section className="relative mb-[8rem] h-screen py-16">
      <Card />
    </motion.section>
  );
}

function Card() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      if (!targetRef.current) return;
      const { clientX, clientY } = ev;
      targetRef.current.style.setProperty("--x", `${clientX}px`);
      targetRef.current.style.setProperty("--y", `${clientY}px`);
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <motion.div
      ref={targetRef}
      style={{ opacity, scale }}
      className="z-10 flex flex-col items-center w-[90%] mx-auto mt-16 p-8 bg-white rounded-lg shadow-lg before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-[radial-gradient(circle_farthest-side_at_var(--x,_100px)_var(--y,_100px),_blue_0%,_transparent_100%)] before:opacity-40"
    >
      <p className="mb-2 text-xl font-light">
        <span className="font-medium">Projects</span> Beta
      </p>
      <p className="mb-8 text-center text-xs font-light text-text">
        by{" "}
        <a
          href="https://www.codesandbox.com"
          target="_blank"
          rel="noopener nofollow noreferrer"
        >
          CodeSandbox
        </a>
        ,
        <br />
        rebuilt by{" "}
        <a
          href="https://www.frontend.fyi"
          target="_blank"
          rel="noopener nofollow noreferrer"
        >
          Frontend.FYI
        </a>
      </p>

      <h1 className="mb-12 text-center font-heading text-3xl leading-[1]">
        Development
        <br />
        reimagined.
      </h1>

      <h1 className="mb-12 text-center font-heading text-3xl leading-[1]">
        Development
        <br />
        reimagined.
      </h1>
    </motion.div>
  );
}
