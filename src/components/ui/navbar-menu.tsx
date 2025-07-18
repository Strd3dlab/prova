"use client";

import React from "react";
import { motion } from "motion/react";
import type { Transition } from "framer-motion";   // ← import del tipo

/* --------------------------------------------------------------
   Transizione “spring” tipizzata: il cast as const evita l’errore
--------------------------------------------------------------- */
const transition: Transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

/* ---------------------------- ITEM --------------------------- */
export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-black hover:opacity-90 dark:text-white"
      >
        {item}
      </motion.p>

      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute left-1/2 top-[calc(100%_+_1.2rem)] -translate-x-1/2 pt-4">
              <motion.div
                layoutId="active"
                transition={transition}
                className="overflow-hidden rounded-2xl border border-black/20 bg-white shadow-xl backdrop-blur-sm dark:border-white/20 dark:bg-black"
              >
                <motion.div layout className="w-max p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

/* ---------------------------- MENU --------------------------- */
export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => (
  <nav
    onMouseLeave={() => setActive(null)}
    className="relative flex justify-center space-x-4 rounded-full border border-transparent bg-white px-8 py-6 shadow-input dark:border-white/20 dark:bg-black"
  >
    {children}
  </nav>
);

/* ---------------------- VOCE PRODOTTO ------------------------ */
export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => (
  <a href={href} className="flex space-x-2">
    <img
      src={src}
      width={140}
      height={70}
      alt={title}
      className="shrink-0 rounded-md shadow-2xl"
    />
    <div>
      <h4 className="mb-1 text-xl font-bold text-black dark:text-white">
        {title}
      </h4>
      <p className="max-w-[10rem] text-sm text-neutral-700 dark:text-neutral-300">
        {description}
      </p>
    </div>
  </a>
);

/* --------------------------- LINK ---------------------------- */
export const HoveredLink = ({
  children,
  ...rest
}: React.ComponentProps<"a">) => (
  <a
    {...rest}
    className="text-neutral-700 hover:text-black dark:text-neutral-200"
  >
    {children}
  </a>
);

