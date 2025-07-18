"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { Transition, Variants } from "framer-motion";

/* --- transizione: 14 s, cubic‑bezier “ease‑in‑out” ----------------- */
const transition: Transition = {
  duration: 14,
  ease: [0.42, 0, 0.58, 1] as const, // ⇐ tupla a 4 numeri
};

const PATH = "M0.5 0.980671L0.5 1566.02";

const MovingLine = () => {
  const ref = useRef<HTMLDivElement>(null);

  /* scroll progress tra 0 e 1 */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  /* pathLength da 1 → 0 al termine dello scroll */
  const pathLengthValue = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const animatedPathLength = useSpring(pathLengthValue, {
    stiffness: 500,
    damping: 100,
  });

  return (
    <div
      ref={ref}
      className="mx-auto flex w-full max-w-4xl flex-row items-start space-x-10"
    >
      <svg
        width="1"
        height="1567"
        viewBox="0 0 1 1567"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* linea di base sfumata */}
        <path d={PATH} stroke="url(#paint0_linear)" />

        <defs>
          <linearGradient
            id="paint0_linear"
            x1="1"
            y1="-102.823"
            x2="1"
            y2="1566.02"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3879E7" stopOpacity="0" />
            <stop offset="1" stopColor="#3879E7" />
          </linearGradient>
        </defs>

        {/* linea animata */}
        <motion.path
          d={PATH}
          stroke="var(--blue-500)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeOpacity="1"
          style={{ pathLength: animatedPathLength }}
          transition={transition}
        />
      </svg>

      {/* contenuto fittizio per riempire la pagina */}
      <div className="flex w-full flex-col">
        <Content />
        <Content />
        <Content />
      </div>
    </div>
  );
};

const Content = () => (
  <div className="content mb-10 w-full">
    <p className="text-2xl font-bold text-white">
      The path follows the scroll
    </p>
    <p className="text-base font-normal text-neutral-300">
      If you look closely, you can see the path is being animated.
    </p>
    <div className="flex w-full space-x-4">
      <div className="h-40 w-full rounded-md bg-gradient-to-tr from-slate-800 to-slate-700 md:h-96 mt-4" />
      <div className="h-40 w-full rounded-md bg-gradient-to-tr from-slate-800 to-slate-700 md:h-96 mt-4" />
    </div>
  </div>
);

export default MovingLine;
