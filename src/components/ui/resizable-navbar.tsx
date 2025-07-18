"use client";

import React from "react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
   Stili base e varianti per i bottoni della navbar
------------------------------------------------------------------- */
const baseStyles =
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
const variantStyles: Record<NavbarVariants, string> = {
  default:
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600",
  ghost:
    "bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200",
};

type NavbarVariants = "default" | "ghost";

/* ------------------------------------------------------------------
   Props del bottone (generico sul tag HTML)
------------------------------------------------------------------- */
export type NavbarButtonProps<
  T extends React.ElementType = "button"
> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  variant?: NavbarVariants;
};

/* ------------------------------------------------------------------
   Bottone della navbar con cast Tag → any
------------------------------------------------------------------- */
export function NavbarButton<T extends React.ElementType = "button">(
  props: NavbarButtonProps<T>
) {
  const {
    as,
    variant = "default",
    className,
    children,
    href,
    ...rest
  } = props;

  /* cast a any per disattivare il controllo sui children */
  const Component = (as || "button") as any;

  return (
    <Component
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...rest}
    >
      {children}
    </Component>
  );
}

/* ------------------------------------------------------------------
   Navbar ridimensionabile
------------------------------------------------------------------- */
export default function ResizableNavbar() {
  return (
    <PanelGroup direction="horizontal" className="h-screen w-full">
      {/* Pannello di sinistra (navbar) */}
      <Panel
        defaultSize={20}
        minSize={15}
        maxSize={30}
        className="flex flex-col items-start gap-4 border-r border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-900"
      >
        <NavbarButton variant="default" className="w-full">
          Home
        </NavbarButton>
        <NavbarButton variant="ghost" className="w-full">
          Blog
        </NavbarButton>
        <NavbarButton variant="ghost" className="w-full">
          About
        </NavbarButton>
        <NavbarButton variant="ghost" className="w-full">
          Contact
        </NavbarButton>
      </Panel>

      {/* Handle di ridimensionamento */}
      <PanelResizeHandle className="w-2 cursor-col-resize bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600" />

      {/* Pannello di destra (contenuto) */}
      <Panel className="p-8">
        <h1 className="mb-4 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Resizable Navbar Demo
        </h1>
        <p className="text-neutral-700 dark:text-neutral-300">
          Trascina il bordo verticale per ridimensionare la barra di
          navigazione. Questo esempio mostra come usare la libreria
          <code className="mx-1 rounded bg-neutral-200 px-1 py-0.5 dark:bg-neutral-700">
            react-resizable-panels
          </code>
          in combinazione con Tailwind CSS.
        </p>
      </Panel>
    </PanelGroup>
  );
}
