/* ----------------------------------------------------------------
   src/components/blocks/pricing/three-tiers-with-feature-comparison.tsx
----------------------------------------------------------------- */

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/* ---------- helper: tipizzato ---------------- */
function classNames(
  ...classes: (string | false | null | undefined)[]
): string {
  return classes.filter(Boolean).join(" ");
}

/* ---------- dati di esempio ------------------ */
const sections = [
  {
    name: "Team",
    features: [
      {
        name: "Unlimited users",
        tiers: { Starter: true, Growth: true, Scale: true },
      },
      {
        name: "Unlimited teams",
        tiers: { Starter: false, Growth: true, Scale: true },
      },
    ],
  },
  {
    name: "Support",
    features: [
      {
        name: "24/7 online support",
        tiers: { Starter: true, Growth: true, Scale: true },
      },
      {
        name: "Quarterly workshops",
        tiers: { Starter: false, Growth: true, Scale: true },
      },
      {
        name: "Priority phone support",
        tiers: { Starter: false, Growth: false, Scale: true },
      },
      {
        name: "1:1 onboarding tour",
        tiers: { Starter: false, Growth: false, Scale: true },
      },
    ],
  },
];

/* ---------- componente principale ------------ */
const PricingTable: React.FC = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="mb-8 text-center text-3xl font-semibold tracking-tight">
        Pricing Plans
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] divide-y divide-neutral-200 dark:divide-neutral-700">
          <thead>
            <tr>
              <th className="w-1/3 py-3 text-left font-medium">Features</th>
              {["Starter", "Growth", "Scale"].map((tier) => (
                <th key={tier} className="py-3 text-center font-medium">
                  {tier}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
            {sections.map((section) => (
              <React.Fragment key={section.name}>
                {/* Section header */}
                <tr className="bg-neutral-50 dark:bg-neutral-900">
                  <td
                    colSpan={4}
                    className="py-2 pl-4 font-semibold tracking-wide"
                  >
                    {section.name}
                  </td>
                </tr>

                {/* Section features */}
                {section.features.map((feature) => (
                  <tr key={feature.name}>
                    <td className="py-2 pl-4">{feature.name}</td>
                    {["Starter", "Growth", "Scale"].map((tier) => (
                      <td
                        key={tier}
                        className={classNames(
                          "py-2 text-center",
                          feature.tiers[tier as keyof typeof feature.tiers]
                            ? "text-emerald-500"
                            : "text-neutral-400 line-through"
                        )}
                      >
                        {feature.tiers[tier as keyof typeof feature.tiers]
                          ? "✓"
                          : "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PricingTable;
