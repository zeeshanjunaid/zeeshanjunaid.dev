"use client";

import { BsWhatsapp } from "react-icons/bs";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Users, Star, MessageCircle, Award } from "lucide-react";
import ContactForm from "../components/contact-form";
import { Container } from "@/components/container";
import React, { Suspense } from "react";
import { BlurBG } from "@/components/blur-bg";
import { motion } from "framer-motion";

// Loading component to use as the Suspense fallback.
// This provides a better UX than a blank space while the form loads.
const FormLoader = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 md:p-10 lg:p-12 bg-light/50 dark:bg-dark/50 rounded-3xl border border-gray-200 dark:border-gray-700">
      <div className="animate-pulse flex flex-col items-center space-y-8">
        <div className="h-7 bg-gray-300 dark:bg-gray-700 rounded w-3/4 md:w-1/2"></div>
        <div className="w-full space-y-6 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-14 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
            <div className="h-14 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
          </div>
          <div className="h-14 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
          <div className="h-36 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
          <div className="flex justify-end">
            <div className="h-12 bg-gray-400 dark:bg-gray-600 rounded-xl w-36"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactPageClient = () => {
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const stats = [
    { icon: MessageCircle, number: "24h", label: "Response Time" },
    { icon: Star, number: "5.0", label: "Client Rating" },
    { icon: Award, number: "100+", label: "Projects Done" },
  ];

  const contactMethods = [
    { icon: Mail, label: "Email", value: "hello@zeeshanjunaid.dev", link: "mailto:hello@zeeshanjunaid.dev", description: "Best for detailed project discussions" },
    { icon: Phone, label: "Phone", value: "+92 340 8563525", link: "tel:+923408563525", description: "Quick calls and urgent matters" },
    { icon: BsWhatsapp, label: "WhatsApp", value: "+92 340 8563525", link: "https://wa.me/923408563525", description: "Instant messaging and file sharing" },
  ];

  const availability = [
    { day: "Monday - Friday", time: "Available for US collaboration" },
    { day: "Saturday", time: "Limited availability" },
    { day: "Sunday", time: "Closed" },
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
        <div className="border-b-[1px] border-b-gray-200 dark:border-b-gray-700 pb-16 md:pb-20">
          <Container className="px-4 pt-4 md:pt-7 lg:px-0 flex flex-col justify-between items-start">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="flex flex-col gap-y-8 max-w-4xl"
            >
              <motion.div variants={itemVariants}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-[2px] bg-purple" />
                  <span className="text-purple font-switzer font-medium text-[12px] md:text-[14px] uppercase tracking-wider">
                    Get In Touch
                  </span>
                </div>
                <h1 className="text-[32px] md:text-[42px] lg:text-[54px] font-bold font-ao text-gray-900 dark:text-white leading-tight mb-6">
                  Ready to Build Your <span className="text-gradient">Next Success Story?</span>
                </h1>
                <p className="font-light text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed text-gray-900/80 dark:text-white/80 max-w-3xl">
                  Whether you need ongoing support or a brand-new application, I offer clear, value-driven packages to bring your vision to life. Let&apos;s find the perfect fit for your project.
                </p>
              </motion.div>
              <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-purple/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <stat.icon className="w-6 h-6 text-purple" />
                    </div>
                    <div className="text-[24px] md:text-[28px] font-bold font-ao text-gray-900 dark:text-white">
                      {stat.number}
                    </div>
                    <div className="text-gray-900/70 dark:text-white/70 font-switzer font-light text-[14px]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </Container>
        </div>
      </motion.section>

      {/* Contact Methods Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-16 md:py-20"
      >
        <Container className="px-4 lg:px-0">
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="inline-flex center gap-x-[10px] items-center font-normal text-gray-900 dark:text-white uppercase text-[14px] tracking-[.42px] mb-6">
              <div className="flex flex-col space-y-[6px]">
                <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
                <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
              </div>
              Contact Methods
            </h2>
            <p className="text-gray-900/70 dark:text-white/70 font-switzer font-light text-[14px] md:text-[16px] lg:text-[18px] max-w-2xl">
              Choose your preferred way to reach out. I&apos;m available through multiple channels to make communication as convenient as possible for you.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div key={index} variants={itemVariants} className="group">
                <a
                  href={method.link}
                  target={method.link.startsWith("http") ? "_blank" : undefined}
                  rel={method.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="relative bg-white dark:bg-gray-900 rounded-3xl p-8 overflow-hidden block h-full border border-gray-200 dark:border-gray-700 hover:border-purple/30 transition-all duration-300 group-hover:scale-105"
                >
                  <BlurBG className="rounded-3xl" />
                  <div className="relative z-20">
                    <div className="w-16 h-16 bg-purple/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple/20 transition-all duration-300">
                      <method.icon className="w-8 h-8 text-purple" />
                    </div>
                    <h3 className="text-[20px] md:text-[24px] font-ao font-bold text-gray-900 dark:text-white mb-2">{method.label}</h3>
                    <p className="text-purple font-switzer font-medium text-[16px] md:text-[18px] mb-3 group-hover:text-purple/80 transition-colors duration-300">{method.value}</p>
                    <p className="text-gray-900/70 dark:text-white/70 font-switzer font-light text-[14px] leading-relaxed">{method.description}</p>
                  </div>
                  <div className="absolute inset-0 bg-linear-to-br from-purple/5 via-transparent to-purple/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              </motion.div>
            ))}
          </div>
        </Container>
      </motion.section>
      
      {/* Availability & Location Section (code unchanged) ... */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-16 md:py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple/5 rounded-full blur-3xl" />
        </div>
        <Container className="px-4 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-purple" />
                <h2 className="text-[24px] md:text-[28px] lg:text-[32px] font-ao font-bold text-gray-900 dark:text-white">Availability</h2>
              </div>
              <p className="text-gray-900/70 dark:text-white/70 font-switzer font-light text-[16px] md:text-[18px] leading-relaxed mb-8">
                I&apos;m available during these hours for calls, meetings, and urgent project discussions. Feel free to schedule a meeting.
              </p>
              <div className="space-y-4">
                {availability.map((schedule, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 overflow-hidden"
                  >
                    <BlurBG className="rounded-2xl" />
                    <div className="relative z-20 flex justify-between items-center">
                      <div>
                        <h4 className="text-gray-900 dark:text-white font-switzer font-medium text-[16px] md:text-[18px] mb-1">
                          {schedule.day}
                        </h4>
                        <p className="text-dark/60 dark:text-light/60 font-switzer font-light text-[14px] uppercase tracking-wider">
                          Pakistan Time
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-switzer font-medium text-[16px] md:text-[18px] ${schedule.time === "Closed"
                              ? "text-red-500/80"
                              : "text-purple"
                            }`}
                        >
                          {schedule.time}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-purple" />
                <h2 className="text-[24px] md:text-[28px] lg:text-[32px] font-ao font-bold text-gray-900 dark:text-white">
                  Location & Response
                </h2>
              </div>
              <div className="space-y-6">
                <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 overflow-hidden">
                  <BlurBG className="rounded-2xl" />
                  <div className="relative z-20">
                    <h4 className="text-gray-900 dark:text-white font-switzer font-medium text-[18px] md:text-[20px] mb-3">
                      📍 Based in Pakistan
                    </h4>
                    <p className="text-gray-900/70 dark:text-white/70 font-switzer font-light text-[16px] leading-relaxed">
                      Working remotely with clients worldwide. I&apos;m experienced in collaborating with US-based teams and am flexible in scheduling key meetings to accommodate your time zone.
                    </p>
                  </div>
                </div>
                <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 overflow-hidden">
                  <BlurBG className="rounded-2xl" />
                  <div className="relative z-20">
                    <h4 className="text-gray-900 dark:text-white font-switzer font-medium text-[18px] md:text-[20px] mb-3">
                      ⚡ Quick Response Time
                    </h4>
                    <p className="text-gray-900/70 dark:text-white/70 font-switzer font-light text-[16px] leading-relaxed">
                      I typically respond to emails within 24 hours and WhatsApp messages within a few hours during business days.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </motion.section>

      {/* Contact Form Section */}
      <section id="project-form" className="py-16 md:py-20">
        <Container className="px-4 lg:px-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="inline-flex center gap-x-[10px] items-center font-normal text-gray-900 dark:text-white uppercase text-[14px] tracking-[.42px] mb-6 justify-center">
              <div className="flex flex-col space-y-[6px]">
                <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
                <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
              </div>
              Project Planner
            </h2>
            <h3 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold font-ao text-gray-900 dark:text-white mb-6">
              Let&apos;s Plan Your Project Together
            </h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Wrap the dynamic component in a Suspense boundary */}
            <Suspense fallback={<FormLoader />}>
              <ContactForm />
            </Suspense>
          </motion.div>
        </Container>
      </section>
    </>
  );
};

export default ContactPageClient;