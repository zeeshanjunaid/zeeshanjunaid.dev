"use client";

import { Container } from "@/components/container";
import React from "react";
import ServiceCard from "../components/service-card";
import { servicesCards } from "@/data/services";
import { motion } from "framer-motion";
import { BlurBG } from "@/components/blur-bg";
import { ArrowRight, CheckCircle, Star, Users, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ServicesPageClient = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const stats = [
    { icon: Users, number: "50+", label: "Happy Clients" },
    { icon: CheckCircle, number: "100+", label: "Projects Completed" },
    { icon: Star, number: "5.0", label: "Average Rating" },
    { icon: Zap, number: "8+", label: "Years Experience" },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Discovery & Strategy",
      description:
        "We start by understanding your business goals, target audience, and project requirements through detailed consultation.",
    },
    {
      number: "02",
      title: "Design & Planning",
      description:
        "Creating wireframes, mockups, and technical specifications that align with your vision and business objectives.",
    },
    {
      number: "03",
      title: "Development & Testing",
      description:
        "Building your solution with clean, scalable code while conducting thorough testing to ensure quality.",
    },
    {
      number: "04",
      title: "Launch & Support",
      description:
        "Deploying your project and providing ongoing support to ensure optimal performance and growth.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-purple/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />
        </div>

        <div className="border-b-[1px] border-b-borderDarkColor pb-16 md:pb-20">
          <Container className="px-5 pt-5 md:pt-7 md:px-7 lg:px-0 flex flex-col justify-between items-start">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-y-6 max-w-4xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-[2px] bg-purple" />
                <span className="text-purple font-switzer font-medium text-[12px] md:text-[14px] uppercase tracking-wider">
                  What I Offer
                </span>
              </div>

              <h1 className="leading-tight text-[32px] md:text-[42px] lg:text-[54px] font-bold font-ao text-dark dark:text-light">
                I Build Digital Solutions That{" "}
                <span className="text-gradient">Drive Business Growth</span>
              </h1>

              <p className="font-light text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed text-dark/80 dark:text-light/80 max-w-3xl">
                Below are the core solutions I provide to help my clients succeed. Each service is a partnership, tailored to solve your unique challenges and deliver a tangible return on your investment.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 mt-4"
              >
                <Link href="/contact">
                  <Button
                    variant="purple"
                    size="lg"
                    className="rounded-xl uppercase font-medium font-switzer flex items-center gap-2"
                  >
                    Start Your Project
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/work">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="rounded-xl uppercase font-medium font-switzer text-dark dark:text-light hover:text-purple"
                  >
                    View My Work
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </Container>
        </div>
      </motion.section>

      {/* Services Grid */}
      <section className="py-16 md:py-20">
        <Container className="px-5 md:px-7 lg:px-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="inline-flex center gap-x-[10px] items-center font-normal text-dark dark:text-light uppercase text-[14px] tracking-[.42px] mb-8">
              <div className="flex flex-col space-y-[6px]">
                <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
                <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
              </div>
              My Services
            </h2>
            <p className="text-dark/70 dark:text-light/70 font-switzer font-light text-[14px] md:text-[16px] lg:text-[18px] max-w-2xl">
              Comprehensive digital solutions designed to elevate your business
              and create meaningful connections with your audience.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="space-y-12 md:space-y-16"
          >
            {servicesCards.map((service, index) => (
              <motion.div key={index} variants={itemVariants} className="group">
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Process Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-16 md:py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple/5 rounded-full blur-3xl" />
        </div>

        <Container className="px-5 md:px-7 lg:px-0">
          <motion.div variants={itemVariants} className="mb-16 text-center">
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold font-ao text-dark dark:text-light mb-6">
              My Process
            </h2>
            <p className="text-dark/70 dark:text-light/70 font-switzer font-light text-[14px] md:text-[16px] lg:text-[18px] max-w-2xl mx-auto">
              A proven methodology that ensures every project is delivered on
              time, within budget, and exceeds expectations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
              >
                <div className="relative bg-light dark:bg-dark rounded-3xl p-8 md:p-10 overflow-hidden h-full">
                  <BlurBG className="rounded-3xl" />

                  <div className="relative z-20">
                    <div className="flex items-start gap-6 mb-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-purple/10 rounded-2xl flex items-center justify-center">
                        <span className="text-purple font-ao font-bold text-[18px]">
                          {step.number}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-[18px] md:text-[20px] lg:text-[24px] font-ao font-bold text-dark dark:text-light mb-3">
                          {step.title}
                        </h3>
                        <p className="text-dark/80 dark:text-light/80 font-switzer font-light text-[14px] md:text-[16px] leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 md:py-20"
      >
        <Container className="px-5 md:px-7 lg:px-0">
          <div className="relative bg-light dark:bg-dark rounded-3xl p-12 md:p-16 text-center overflow-hidden">
            <BlurBG className="rounded-3xl" />

            <div className="absolute inset-0 bg-gradient-to-br from-purple/10 via-transparent to-purple/5 rounded-3xl" />

            <div className="relative z-20">
              <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold font-ao text-dark dark:text-light mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-dark/80 dark:text-light/80 font-switzer font-light text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed max-w-2xl mx-auto mb-8">
                Let&apos;s discuss how I can help bring your vision to life with
                custom digital solutions that drive real results.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    variant="purple"
                    size="lg"
                    className="rounded-xl uppercase font-medium font-switzer flex items-center gap-2"
                  >
                    Get Started Today
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="rounded-xl uppercase font-medium font-switzer text-dark dark:text-light hover:text-purple"
                  >
                    View Pricing Plans
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </motion.section>
    </>
  );
};

export default ServicesPageClient;
