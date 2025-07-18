"use client";

import { cn } from "@/lib/utils";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

/* ----------------------------------------------------------------
   CONTEXT per lo stato “mouse‑entered”
----------------------------------------------------------------- */
const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

export const useMouseEnter = () => {
  const ctx = useContext(MouseEnterContext);
  if (!ctx) {
    throw new Error("useMouseEnter must be used within CardContainer");
  }
  return ctx;
};

/* ----------------------------------------------------------------
   CARD CONTAINER (gestisce la rotazione 3D globale)
----------------------------------------------------------------- */
export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isEntered, setIsEntered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    el.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const reset = () => {
    const el = containerRef.current;
    if (!el) return;
    el.style.transform = "rotateY(0deg) rotateX(0deg)";
  };

  return (
    <MouseEnterContext.Provider value={[isEntered, setIsEntered]}>
      <div
        className={cn("py-20 flex items-center justify-center", containerClassName)}
        style={{ perspective: "1000px" }}
      >
        <div
          ref={containerRef}
          onMouseEnter={() => setIsEntered(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            setIsEntered(false);
            reset();
          }}
          className={cn(
            "relative flex items-center justify-center transition-all duration-200 ease-linear",
            className
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

/* ----------------------------------------------------------------
   CARD BODY (wrapper interno)
----------------------------------------------------------------- */
export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "h-96 w-96 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
      className
    )}
  >
    {children}
  </div>
);

/* ----------------------------------------------------------------
   CARD ITEM (ogni elemento volante all’interno della card)
----------------------------------------------------------------- */
export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  [key: string]: any;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isEntered] = useMouseEnter();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isEntered) {
      el.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      el.style.transform =
        "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)";
    }
  }, [isEntered, translateX, translateY, translateZ, rotateX, rotateY, rotateZ]);

  /* ---------- cast “Tag” a any per evitare l’errore sui children ---------- */
  const Component = Tag as any;

  return (
    <Component
      ref={ref}
      className={cn("w-fit transition duration-200 ease-linear", className)}
      {...rest}
    >
      {children}
    </Component>
  );
};
