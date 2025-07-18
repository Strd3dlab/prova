"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as ReChartsTooltip,
  ResponsiveContainer,
  type TooltipProps,
} from "recharts";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
   DATI DI ESEMPIO (puoi sostituirli con i tuoi)
------------------------------------------------------------------- */
const data = [
  { name: "Jan", value: 24 },
  { name: "Feb", value: 13 },
  { name: "Mar", value: 30 },
  { name: "Apr", value: 22 },
  { name: "May", value: 18 },
  { name: "Jun", value: 27 },
];

/* ------------------------------------------------------------------
   Alias tooltip che ESTENDE TooltipProps (così “payload” esiste)
------------------------------------------------------------------- */
type CustomTooltipProps = TooltipProps<number, string> & {
  payload?: any[];
  className?: string;
  indicator?: "dot" | "line" | "dashed";
  hideLabel?: boolean;
  hideIndicator?: boolean;
  nameKey?: string;
  labelKey?: string;

 label?: string | number;
  labelFormatter?: (...args: any[]) => React.ReactNode;
  formatter?: (...args: any[]) => React.ReactNode;
  labelClassName?: string;
  color?: string;


};

/* ------------------------------------------------------------------
   COMPONENTE TOOLTIP
------------------------------------------------------------------- */
function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: CustomTooltipProps) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const item = payload[0];
  const displayValue =
    formatter?.(item.value, item.name, payload, item) ?? item.value;
  const displayLabel =
    labelFormatter?.(label ?? "", payload) ?? (label ?? "");

  return (
    <div
      className={cn(
        "rounded-md border bg-background p-2 shadow-sm",
        className
      )}
    >
      {!hideLabel && (
        <p
          className={cn(
            "mb-1 text-[10px] text-muted-foreground",
            labelClassName
          )}
        >
          {displayLabel}
        </p>
      )}
      <div className="flex items-center gap-2">
        {!hideIndicator && indicator === "dot" && (
          <span
            className="inline-block size-2 shrink-0 rounded-full"
            style={{ backgroundColor: color ?? item.color }}
          />
        )}
        {!hideIndicator && indicator === "line" && (
          <span
            className="inline-block h-2 w-4 shrink-0 rounded-sm"
            style={{ backgroundColor: color ?? item.color }}
          />
        )}
        <span className="text-xs font-medium">{displayValue}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   LEGGENDA (esempio minimale)
------------------------------------------------------------------- */
const ChartLegend = () => (
  <div className="mt-2 flex items-center gap-2 text-sm">
    <span className="inline-block size-2 rounded-full bg-blue-500" />
    <span>Serie A</span>
  </div>
);

/* ------------------------------------------------------------------
   COMPONENTE CHART PRINCIPALE
------------------------------------------------------------------- */
export default function Chart() {
  return (
    <div className="w-full max-w-xl">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <ReChartsTooltip
            content={<ChartTooltipContent />}
            cursor={{ strokeDasharray: "3 3" }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <ChartLegend />
    </div>
  );
}
