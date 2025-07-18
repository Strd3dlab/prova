import { Fragment } from "react";
import {
  CheckIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/16/solid";
import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";

const tiers = [
  {
    name: "Starter",
    description: "Everything you need to get started.",
    priceMonthly: "$19",
    href: "#",
    highlights: [
      { description: "Custom domains" },
      { description: "Edge content delivery" },
      { description: "Advanced analytics" },
      { description: "Quarterly workshops", disabled: true },
      { description: "Single sign-on (SSO)", disabled: true },
    ],
  },
  {
    name: "Growth",
    description: "Everything you need to grow your business.",
    priceMonthly: "$39",
    href: "#",
    highlights: [
      { description: "Custom domains" },
      { description: "Edge content delivery" },
      { description: "Advanced analytics" },
      { description: "Quarterly workshops" },
      { description: "Single sign-on (SSO)", disabled: true },
    ],
  },
  {
    name: "Scale",
    description: "Everything you need to scale your business.",
    priceMonthly: "$79",
    href: "#",
    highlights: [
      { description: "Custom domains" },
      { description: "Edge content delivery" },
      { description: "Advanced analytics" },
      { description: "Quarterly workshops" },
      { description: "Single sign-on (SSO)" },
    ],
  },
];

const sections = [
  {
    name: "Features",
    features: [
      {
        name: "Edge content delivery",
        tiers: { Starter: true, Growth: true, Scale: true },
      },
      {
        name: "Custom domains",
        tiers: { Starter: "1", Growth: "3", Scale: "Unlimited" },
      },
      {
        name: "Team members",
        tiers: { Starter: "3", Growth: "20", Scale: "Unlimited" },
      },
      {
        name: "Single sign-on (SSO)",
        tiers: { Starter: false, Growth: false, Scale: true },
      },
    ],
  },
  {
    name: "Reporting",
    features: [
      {
        name: "Advanced analytics",
        tiers: { Starter: true, Growth: true, Scale: true },
      },
      {
        name: "Data history",
        tiers: { Starter: "30 days", Growth: "Unlimited", Scale: "Unlimited" },
      },
    ],
  },
  {
    name: "Support",
    features: [
      {
        name: "Priority support",
        tiers: { Starter: false, Growth: true, Scale: true },
      },
      {
        name: "Quarterly workshops",
        tiers: { Starter: false, Growth: true, Scale: true },
      },
    ],
  },
];

export default function Example() {
  return (
    <div className="py-24 sm:py-32">
      {/* ---------- Desktop table ---------- */}
      <div className="mx-auto hidden max-w-7xl px-6 lg:block lg:px-8">
        <table className="w-full border-separate border-spacing-x-8 text-left">
          <thead>
            <tr>
              <td className="py-8 pr-8">
                <p className="text-xl font-semibold leading-6 text-gray-900">
                  Plans
                </p>
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  Choose the plan that best fits your needs.
                </p>
              </td>
              {tiers.map((tier) => (
                <th
                  key={tier.name}
                  scope="col"
                  className="w-1/4 px-6 py-8 text-center"
                >
                  <p className="text-lg font-semibold leading-6 text-gray-900">
                    {tier.name}
                  </p>
                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    {tier.priceMonthly} / mo
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sections.map((section) => (
              <Fragment key={section.name}>
                <tr>
                  <th
                    colSpan={4}
                    className="py-4 text-sm font-semibold leading-6 text-gray-900"
                  >
                    {section.name}
                  </th>
                </tr>
                {section.features.map((feature) => (
                  <tr key={feature.name}>
                    <th className="py-4 text-sm leading-6 text-gray-900">
                      {feature.name}
                    </th>
                    {tiers.map((tier) => {
                      const key =
                        tier.name as keyof typeof feature.tiers;
                      return (
                        <td
                          key={tier.name}
                          className="p-4 text-center text-sm"
                        >
                          {typeof feature.tiers[key] === "string" ? (
                            <>
                              <span className="sr-only">
                                {tier.name} includes:
                              </span>
                              <span className="text-gray-950">
                                {feature.tiers[key] as string}
                              </span>
                            </>
                          ) : feature.tiers[key] === true ? (
                            <CheckIcon
                              className="mx-auto h-5 w-5 text-green-600"
                              aria-hidden="true"
                            />
                          ) : (
                            <MinusIcon
                              className="mx-auto h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- Mobile tabs ---------- */}
      <TabGroup as="div" className="mx-auto max-w-2xl px-4 sm:px-6 lg:hidden">
        <TabList className="flex divide-x divide-gray-900/5 rounded-lg text-sm font-medium ring-1 ring-gray-900/10">
          {tiers.map((tier) => (
            <Tab
              key={tier.name}
              className="w-full rounded-l-lg rounded-r-lg py-2.5 text-center data-[selected]:bg-gray-50 data-[selected]:text-indigo-600 data-[hover]:bg-gray-50 focus:outline-none"
            >
              {tier.name}
            </Tab>
          ))}
        </TabList>

        <TabPanels className="mt-10">
          {tiers.map((tier) => (
            <TabPanel key={tier.name} className="space-y-16">
              {sections.map((section) => (
                <div key={section.name}>
                  <h3 className="text-sm font-semibold leading-6 text-gray-900">
                    {section.name}
                  </h3>

                  <div className="relative mt-6">
                    {/* decorative lines */}
                    <div className="absolute inset-0 flex items-stretch justify-center">
                      <div className="h-full w-1/2 rounded-l-lg bg-gray-200/50" />
                      <div className="h-full w-1/2 rounded-r-lg bg-gray-200/50" />
                    </div>

                    <dl className="relative grid grid-cols-2 rounded-lg text-sm">
                      {section.features.map((feature) => {
                        const key =
                          tier.name as keyof typeof feature.tiers;
                        return (
                          <div
                            key={feature.name}
                            className="p-4 leading-6"
                          >
                            <dt className="text-gray-600">
                              {feature.name}
                            </dt>
                            <dd className="mt-2">
                              {typeof feature.tiers[key] === "string" ? (
                                <>
                                  <span className="sr-only">
                                    {tier.name} includes:
                                  </span>
                                  <span className="text-gray-950">
                                    {feature.tiers[key] as string}
                                  </span>
                                </>
                              ) : feature.tiers[key] === true ? (
                                <CheckIcon
                                  className="inline-block h-4 w-4 text-green-600"
                                  aria-hidden="true"
                                />
                              ) : (
                                <MinusIcon
                                  className="inline-block h-4 w-4 text-gray-400"
                                  aria-hidden="true"
                                />
                              )}
                            </dd>
                          </div>
                        );
                      })}
                    </dl>
                  </div>
                </div>
              ))}
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
}
