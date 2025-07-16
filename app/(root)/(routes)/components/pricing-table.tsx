"use client";

import React, { useState } from "react";
import { Check, Code, Headphones, Palette, Rocket, Shield, Zap } from "lucide-react";

import { BlurBG } from "@/components/blur-bg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PricingTier {
  id: string;
  name: string;
  price: string;
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
    name: "The Maintenance Plan",
    price: "$500",
    description: "Perfect for established businesses who need ongoing website maintenance and minor updates.",
    features: [
      { icon: <Shield className="w-4 h-4" />, text: "Monthly website maintenance" },
      { icon: <Zap className="w-4 h-4" />, text: "Performance optimization" },
      { icon: <Code className="w-4 h-4" />, text: "Bug fixes and minor updates" },
      { icon: <Headphones className="w-4 h-4" />, text: "Priority email support" },
      { icon: <Check className="w-4 h-4" />, text: "Security monitoring" },
      { icon: <Check className="w-4 h-4" />, text: "Monthly performance reports" },
    ],
    ctaText: "Start Maintenance Plan",
  },
  {
    id: "development",
    name: "The Development Plan",
    price: "$1,500",
    description: "Ideal for growing companies that need regular feature development and design updates.",
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
    ctaText: "Start Development Plan",
  },
  {
    id: "enterprise",
    name: "The Enterprise Plan",
    price: "$3,000",
    description: "For large organizations requiring dedicated development resources and premium support.",
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
    ctaText: "Start Enterprise Plan",
  },
];

type PaymentMethod = "stripe" | "crypto";

const PricingTable = () => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("stripe");

  const handleSubscribe = (tierId: string) => {
    // For now, redirect to sign up if not authenticated
    // This will be replaced with actual payment processing
    window.location.href = '/sign-up';
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Payment Method Toggle */}
      <div className="flex justify-center">
        <div className="relative rounded-xl p-1 overflow-hidden">
          <BlurBG className="rounded-xl" />
          <div className="relative z-20 flex bg-transparent">
            <button
              onClick={() => setPaymentMethod("stripe")}
              className={cn(
                "px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                paymentMethod === "stripe"
                  ? "bg-purple text-dark dark:text-light"
                  : "text-dark dark:text-light hover:bg-purple/20"
              )}
            >
              Pay with Card (Stripe)
            </button>
            <button
              onClick={() => setPaymentMethod("crypto")}
              className={cn(
                "px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                paymentMethod === "crypto"
                  ? "bg-purple text-dark dark:text-light"
                  : "text-dark dark:text-light hover:bg-purple/20"
              )}
            >
              Pay with Crypto (Coinbase)
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {pricingTiers.map((tier) => (
          <div
            key={tier.id}
            className={cn(
              "relative rounded-3xl overflow-hidden",
              tier.popular && "ring-2 ring-purple"
            )}
          >
            {tier.popular && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                <div className="bg-purple text-dark dark:text-light px-4 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
                  Most Popular
                </div>
              </div>
            )}
            
            <div className="relative p-8 h-full">
              <BlurBG className="rounded-3xl" />
              
              <div className="relative z-20 flex flex-col h-full">
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-[24px] md:text-[28px] font-bold font-ao text-dark dark:text-light mb-2">
                    {tier.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-[36px] md:text-[42px] font-bold font-ao text-dark dark:text-light">
                      {tier.price}
                    </span>
                    <span className="text-dark/70 dark:text-light/70 text-lg font-light">
                      /month
                    </span>
                  </div>
                  <p className="text-dark/80 dark:text-light/80 text-sm leading-relaxed">
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
                        <span className="text-dark dark:text-light text-sm leading-relaxed">
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => handleSubscribe(tier.id)}
                  variant="purple"
                  size="lg"
                  className="w-full rounded-xl uppercase font-medium"
                >
                  {tier.ctaText}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="text-center mt-8">
        <p className="text-dark/70 dark:text-light/70 text-sm">
          All plans include a 7-day free trial. Cancel anytime. 
          {paymentMethod === "crypto" && " Crypto payments are processed securely through Coinbase Commerce."}
        </p>
      </div>
    </div>
  );
};

export default PricingTable;