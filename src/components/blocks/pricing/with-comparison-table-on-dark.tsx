import { CheckIcon, MinusIcon } from "@heroicons/react/20/solid";

/* -------------------------------------------------------------
   DATI
------------------------------------------------------------- */
const tiers = [
  {
    name: "Starter",
    href: "#",
    priceMonthly: "$19",
    description: "All the basics for starting a new project.",
  },
  {
    name: "Growth",
    href: "#",
    priceMonthly: "$39",
    description: "Everything you need to grow.",
  },
  {
    name: "Scale",
    href: "#",
    priceMonthly: "$99",
    description: "Advanced features for scaling your business.",
  },
];

const sections = [
  {
    name: "Features",
    features: [
      {
        name: "Unlimited products",
        tiers: { Starter: true, Growth: true, Scale: true },
      },
      {
        name: "Audience segmentation",
        tiers: { Starter: false, Growth: true, Scale: true },
      },
      {
        name: "Advanced analytics",
        tiers: { Starter: false, Growth: true, Scale: true },
      },
    ],
  },
  {
    name: "Support",
    features: [
      {
        name: "Email support",
        tiers: { Starter: true, Growth: true, Scale: true },
      },
      {
        name: "Priority support",
        tiers: { Starter: false, Growth: true, Scale: true },
      },
    ],
  },
];

/* -------------------------------------------------------------
   HELPER (tipizzato)
------------------------------------------------------------- */
function classNames(
  ...classes: (string | false | null | undefined)[]
): string {
  return classes.filter(Boolean).join(" ");
}

/* -------------------------------------------------------------
   COMPONENTE PRINCIPALE
------------------------------------------------------------- */
export default function PricingComparison() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold text-indigo-600">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Compare our plans
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Choose an affordable plan that’s packed with the best features
            for engaging your audience, creating customer loyalty, and
            driving sales.
          </p>
        </div>

        {/* Table */}
        <div className="mt-16 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="py-4 text-left text-sm font-semibold text-gray-900">
                  &nbsp;
                </th>
                {tiers.map((tier) => (
                  <th
                    key={tier.name}
                    scope="col"
                    className="py-4 text-center text-sm font-semibold text-gray-900"
                  >
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sections.map((section) => (
                <tr key={section.name}>
                  <th
                    colSpan={tiers.length + 1}
                    className="bg-gray-50 py-3 text-left text-sm font-semibold text-indigo-600"
                  >
                    {section.name}
                  </th>
                </tr>
              ))}
              {sections.map((section) =>
                section.features.map((feature) => (
                  <tr key={feature.name}>
                    <td className="whitespace-nowrap py-4 pr-6 text-sm text-gray-700">
                      {feature.name}
                    </td>
                    {tiers.map((tier) => {
                      const key =
                        tier.name as keyof typeof feature.tiers;
                      return (
                        <td
                          key={tier.name}
                          className="whitespace-nowrap py-4 text-center text-sm text-gray-700"
                        >
                          {feature.tiers[key] === true ? (
                            <CheckIcon
                              className="mx-auto h-5 w-5 text-green-600"
                              aria-hidden="true"
                            />
                          ) : feature.tiers[key] === false ? (
                            <MinusIcon
                              className="mx-auto h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          ) : (
                            feature.tiers[key] // string value, e.g., "Unlimited"
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
