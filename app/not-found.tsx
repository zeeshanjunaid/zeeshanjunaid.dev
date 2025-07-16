"use client";

import React from "react";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { BlurBG } from "@/components/blur-bg";
import Link from "next/link";
import { Home, ArrowLeft, Search, Mail } from "lucide-react";
import navLinks from "@/data/nav";

export default function NotFound() {
  const quickLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "About", href: "/about", icon: Search },
    { label: "Work", href: "/work", icon: Search },
    { label: "Contact", href: "/contact", icon: Mail },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Container className="px-4 lg:px-0">
        <div className="text-center">
          {/* Main 404 Display */}
          <div className="mb-8">
            <h1 className="text-[120px] md:text-[180px] lg:text-[220px] font-bold font-ao text-dark dark:text-light leading-none mb-4">
              404
            </h1>
            <h2 className="text-[28px] md:text-[36px] lg:text-[44px] font-bold font-ao text-dark dark:text-light mb-4">
              Page Not Found
            </h2>
            <p className="text-[16px] md:text-[18px] lg:text-[20px] text-dark/70 dark:text-light/70 font-light max-w-2xl mx-auto leading-relaxed">
              Oops! The page you&apos;re looking for seems to have wandered off
              into the digital void. Don&apos;t worry, even the best explorers
              sometimes take a wrong turn.
            </p>
          </div>

          {/* Navigation Card */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="bg-light dark:bg-dark rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <BlurBG className="rounded-3xl" />

              <div className="relative z-20">
                <h3 className="text-[20px] md:text-[24px] font-ao font-bold text-dark dark:text-light mb-6">
                  Let&apos;s get you back on track
                </h3>

                {/* Quick Navigation Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {quickLinks.map(({ label, href, icon: Icon }, index) => (
                    <Link key={label} href={href}>
                      <div className="group p-4 rounded-xl bg-light dark:bg-dark border border-lightBorderColor dark:border-darkBorderColor hover:border-purple/50 transition-all duration-200 hover:bg-purple/5 relative overflow-hidden">
                        <BlurBG className="rounded-xl" />
                        <div className="relative z-20">
                          <Icon className="w-6 h-6 text-purple mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
                          <span className="text-sm font-medium text-dark dark:text-light group-hover:text-purple transition-colors duration-200">
                            {label}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Main CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/">
                    <Button
                      variant="purple"
                      size="lg"
                      className="rounded-xl uppercase font-medium flex items-center gap-2"
                    >
                      <Home className="w-4 h-4" />
                      Back to Home
                    </Button>
                  </Link>

                  <Button
                    variant="ghost"
                    size="lg"
                    className="rounded-xl uppercase font-medium text-dark dark:text-light hover:text-purple hover:bg-purple/10 flex items-center gap-2"
                    onClick={() => window.history.back()}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Go Back
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* All Navigation Links */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-light dark:bg-dark rounded-3xl p-6 md:p-8 relative overflow-hidden">
              <BlurBG className="rounded-3xl" />
              
              <div className="relative z-20">
                <h4 className="text-[18px] md:text-[20px] font-ao font-bold text-dark dark:text-light mb-6">
                  Or explore all sections
                </h4>
                
                <div className="flex flex-wrap justify-center gap-3">
                  <Link href="/">
                    <Button
                      variant="ghost"
                      className="rounded-xl text-dark dark:text-light hover:text-purple hover:bg-purple/20 font-medium uppercase text-sm"
                    >
                      Home
                    </Button>
                  </Link>
                  {navLinks.map(({ link, label }) => (
                    <Link key={label} href={link}>
                      <Button
                        variant="ghost"
                        className="rounded-xl text-dark dark:text-light hover:text-purple hover:bg-purple/20 font-medium uppercase text-sm"
                      >
                        {label}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Message */}
          <div className="mt-8">
            <p className="text-sm text-dark/50 dark:text-light/50 font-light">
              {"Not all who wander are lost, but this page definitely is."}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}