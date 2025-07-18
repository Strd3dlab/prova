"use client";

import { cn } from "@/lib/utils";
import { motion, MotionValue } from "motion/react";
import React from "react";
import type { Transition } from "framer-motion";   // ✅ import del tipo

/* --- transizione accettata da Framer Motion 12 --- */
const transition: Transition = {
  duration: 0.6,
  ease: [0.42, 0, 1, 1],   // cubic‑bezier (ease‑out)
};

export const GoogleGeminiEffect = ({
  pathLengths,
  title,
  description,
  className,
}: {
  pathLengths: MotionValue[];
  title?: string;
  description?: string;
  className?: string;
}) => {
  return (
    <div className={cn("sticky top-80", className)}>
      <p className="bg-gradient-to-b from-neutral-100 to-neutral-300 bg-clip-text pb-4 text-center text-lg font-normal text-transparent md:text-7xl">
        {title || "Build with Aceternity UI"}
      </p>
      <p className="mx-auto mt-4 max-w-lg text-center text-xs font-normal text-neutral-400 md:text-xl">
        {description ||
          "Scroll this component and see the bottom SVG come to life wow this works!"}
      </p>

      {/* pulsante centrale */}
      <div className="absolute -top-60 flex h-[890px] w-full items-center justify-center md:-top-40">
        <button className="mx-auto mt-8 w-fit rounded-full bg-white px-2 py-1 text-xs font-bold text-black md:mt-24 md:px-4 md:py-2 md:text-base">
          ui.aceternity.com
        </button>
      </div>

      {/* SVG animato */}
      <svg
        width="1440"
        height="890"
        viewBox="0 0 1440 890"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -top-60 w-full md:-top-40"
      >
        {/* ----- prima path ----- */}
        <motion.path
          d="M0 663C145.5 663 ... 1440 662.5"
          stroke="#FFB7C5"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          style={{ pathLength: pathLengths[0] }}
          transition={transition}
        />

        {/* ----- seconda path ----- */}
        <motion.path
          d="M0 587.5C147 587.5 ... 1440 588"
          stroke="#FFDDB7"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          style={{ pathLength: pathLengths[1] }}
          transition={transition}
        />

        {/* ----- terza path ----- */}
        <motion.path
          d="M0 514C147.5 514.333 ... 1440 513.235"
          stroke="#B1C5FF"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          style={{ pathLength: pathLengths[2] }}
          transition={transition}
        />

        {/* ----- quarta path ----- */}
        <motion.path
          d="M0 438.5C150.5 438.5 ... 1440 439"
          stroke="#4FABFF"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          style={{ pathLength: pathLengths[3] }}
          transition={transition}
        />

        {/* ----- quinta path ----- */}
        <motion.path
          d="M0.5 364C145.288 362.349 ... 1439 364"
          stroke="#076EFF"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          style={{ pathLength: pathLengths[4] }}
          transition={transition}
        />

        {/* Gaussian blur (sfondo) */}
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
          </filter>
        </defs>

        {/* stesse path di sfondo con blur */}
        {/* ... (omesse per brevità, ma identiche alle originali con `filter="url(#blurMe)"` e `pathLength={1}`) */}
      </svg>
    </div>
  );
};
