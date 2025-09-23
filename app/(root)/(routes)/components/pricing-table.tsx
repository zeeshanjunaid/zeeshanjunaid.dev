"use client";

import React, { useState } from "react";
import { Check, Code, Headphones, Palette, Rocket, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { BlurBG } from "@/components/blur-bg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PricingTier {
  id: string;
  name: string;
  price: number;
  description: string;
  features: {
    icon: React.ReactNode;
    text: string;
  }[];
  popular?: boolean;
  ctaText: string;
}

const pricingTiers: PricingTier[] = [
  {
    id: "maintenance",
    name: "Optimize & Grow",
    price: 500,
    description: "For businesses that need a reliable partner to keep their website secure, fast, and constantly improving.",
    features: [
      { icon: <Shield className="w-4 h-4" />, text: "Monthly website maintenance" },
      { icon: <Zap className="w-4 h-4" />, text: "Performance optimization" },
      { icon: <Code className="w-4 h-4" />, text: "Bug fixes and minor updates" },
      { icon: <Headphones className="w-4 h-4" />, text: "Priority email support" },
      { icon: <Check className="w-4 h-4" />, text: "Security monitoring" },
      { icon: <Check className="w-4 h-4" />, text: "Monthly performance reports" },
    ],
    ctaText: "Choose Optimize & Grow",
  },
  {
    id: "development",
    name: "Innovation Partner",
    price: 1500,
    description: "For growing companies that need a dedicated partner for feature development and strategic improvements.",
    features: [
      { icon: <Code className="w-4 h-4" />, text: "Everything in Maintenance Plan" },
      { icon: <Palette className="w-4 h-4" />, text: "Custom feature development" },
      { icon: <Rocket className="w-4 h-4" />, text: "UI/UX design updates" },
      { icon: <Zap className="w-4 h-4" />, text: "Advanced integrations" },
      { icon: <Headphones className="w-4 h-4" />, text: "Weekly progress calls" },
      { icon: <Check className="w-4 h-4" />, text: "Priority development queue" },
      { icon: <Check className="w-4 h-4" />, text: "Mobile optimization" },
    ],
    popular: true,
    ctaText: "Choose Innovation Partner",
  },
  {
    id: "enterprise",
    name: "Dedicated Tech Lead",
    price: 3000,
    description: "For organizations that need a dedicated technical leader to drive their digital initiatives forward.",
    features: [
      { icon: <Code className="w-4 h-4" />, text: "Everything in Development Plan" },
      { icon: <Rocket className="w-4 h-4" />, text: "Dedicated development time" },
      { icon: <Palette className="w-4 h-4" />, text: "Custom application development" },
      { icon: <Shield className="w-4 h-4" />, text: "Advanced security features" },
      { icon: <Headphones className="w-4 h-4" />, text: "24/7 priority support" },
      { icon: <Zap className="w-4 h-4" />, text: "Multi-platform development" },
      { icon: <Check className="w-4 h-4" />, text: "Team collaboration tools" },
      { icon: <Check className="w-4 h-4" />, text: "Custom integrations" },
    ],
    ctaText: "Choose Dedicated Tech Lead",
  },
];

const PricingTable = () => {

  return (
    <div className="flex flex-col gap-8">

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {pricingTiers.map((tier) => (
          <div
            key={tier.id}
            className={cn(
              "relative rounded-3xl overflow-hidden",
              tier.popular && "ring-2 ring-purple !overflow-visible",
            )}
          >
            {tier.popular && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                <div className="bg-purple text-gray-900 dark:text-white px-4 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
                  Most Popular
                </div>
              </div>
            )}
            
            <div className="relative p-8 h-full">
              <BlurBG className="rounded-3xl" />
              
              <div className="relative z-20 flex flex-col h-full">
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-[24px] md:text-[28px] font-bold font-ao text-gray-900 dark:text-white mb-2">
                    {tier.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-[36px] md:text-[42px] font-bold font-ao text-gray-900 dark:text-white">
                      ${tier.price}
                    </span>
                    <span className="text-gray-900/70 dark:text-white/70 text-lg font-light">
                      /month
                    </span>
                  </div>
                  <p className="text-gray-900/80 dark:text-white/80 text-sm leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                {/* Features */}
                <div className="flex-1 mb-8">
                  <ul className="space-y-4">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="text-purple mt-0.5 flex-shrink-0">
                          {feature.icon}
                        </div>
                        <span className="text-gray-900 dark:text-white text-sm leading-relaxed">
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Link href={`#project-form?service=${tier.id}`}>
                  <Button
                    variant="purple"
                    size="lg"
                    className="w-full rounded-xl uppercase font-medium"
                  >
                    {tier.ctaText}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="text-center mt-8">
        <p className="text-gray-900/70 dark:text-white/70 text-sm">
          All plans can be paused or cancelled anytime with 30 days notice.
        </p>
        <p className="text-gray-900/50 dark:text-white/50 text-xs mt-2">
          Contact me directly to get started with your chosen plan.
        </p>
      </div>
    </div>
  );
};

export { pricingTiers };
export default PricingTable;