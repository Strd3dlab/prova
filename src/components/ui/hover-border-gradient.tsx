"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";

/* ------------------------------------------------------------------
   Mappa dei gradienti in movimento per direzione (esempio)
------------------------------------------------------------------- */
const movingMap: Record<"left" | "right", string> = {
  left: "linear-gradient(90deg, #14b8a6, #4f46e5)",
  right: "linear-gradient(270deg, #14b8a6, #4f46e5)",
};

/* ------------------------------------------------------------------
   Interfaccia dei props (ristabilita)
------------------------------------------------------------------- */
export type HoverBorderGradientProps<
  T extends React.ElementType = "button"
> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  direction?: "left" | "right";
  duration?: number;
  highlight?: string;
};
/* ------------------------------------------------------------------
   Componente principale
------------------------------------------------------------------- */
export function HoverBorderGradient({
  as: Tag = "button",
  children,
  className,
  containerClassName,
  direction = "left",
  duration = 2,
  highlight = "#14b8a6",
  ...props
}: HoverBorderGradientProps) {
  const [hovered, setHovered] = React.useState(false);

  // ── cast Tag → any per ignorare il controllo dei children
  const Component = Tag as any;

  return (
    <Component
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex w-fit items-center justify-center overflow-visible rounded-full border bg-black/20 p-px transition duration-500 hover:bg-black/10 dark:bg-white/20",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "z-10 rounded-[inherit] bg-black px-4 py-2 text-white",
          className
        )}
      >
        {children}
      </div>

      {/* sfondo animato */}
      <motion.div
        className="absolute inset-0 z-0 rounded-[inherit]"
        style={{ width: "100%", height: "100%", filter: "blur(2px)" }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration }}
      />

      {/* bordo interno nero */}
      <div className="absolute inset-[2px] z-[1] rounded-[inherit] bg-black" />
    </Component>
  );
}
