import { BsWhatsapp } from "react-icons/bs";
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, Star, Users, Award, Zap } from "lucide-react";

import ContactForm from "../components/contact-form";
import { Container } from "@/components/container";
import CustomLink from "@/components/custom-link";
import React from "react";
import { BlurBG } from "@/components/blur-bg";
import { motion } from "framer-motion";

export const metadata = {
  title: "Contact",
};

const ContactPage = () => {
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
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const stats = [
    { icon: Users, number: "50+", label: "Happy Clients" },
    { icon: MessageCircle, number: "24h", label: "Response Time" },
    { icon: Star, number: "5.0", label: "Client Rating" },
    { icon: Award, number: "100+", label: "Projects Done" },
  ];

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@zeeshanjunaid.dev",
      link: "mailto:hello@zeeshanjunaid.dev",
      description: "Best for detailed project discussions",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+92 340 8563525",
      link: "tel:+923408563525",
      description: "Quick calls and urgent matters",
    },
    {
      icon: BsWhatsapp,
      label: "WhatsApp",
      value: "+92 340 8563525",
      link: "https://wa.me/923408563525",
      description: "Instant messaging and file sharing",
    },
  ];

  const availability = [
    { day: "Monday - Friday", time: "9:00 AM - 6:00 PM", timezone: "PKT" },
    { day: "Saturday", time: "10:00 AM - 4:00 PM", timezone: "PKT" },
    { day: "Sunday", time: "Closed", timezone: "" },
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
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-purple/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />
        </div>

        <div className="border-b-[1px] border-b-lightBorderColor dark:border-b-darkBorderColor pb-16 md:pb-20">
          <Container className="px-4 lg:px-0 flex flex-col justify-between items-start">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="flex flex-col gap-y-8 max-w-4xl"
            >
              {/* Header */}
              <motion.div variants={itemVariants}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-[2px] bg-purple" />
                  <span className="text-purple font-switzer font-medium text-[12px] md:text-[14px] uppercase tracking-wider">
                    Get In Touch
                  </span>
                </div>

                <h1 className="text-[32px] md:text-[42px] lg:text-[54px] font-bold font-ao text-dark dark:text-light leading-tight mb-6">
                  Let's Create Something{" "}
                  <span className="text-gradient">Amazing Together</span>
                </h1>

                <p className="font-light text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed text-dark/80 dark:text-light/80 max-w-3xl">
                  Ready to bring your digital vision to life? I'm here to help you create 
                  exceptional web experiences that drive results. Let's discuss your project 
                  and explore how we can work together.
                </p>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="relative bg-light dark:bg-dark rounded-2xl p-6 overflow-hidden group hover:scale-105 transition-transform duration-300"
                  >
                    <BlurBG className="rounded-2xl" />
                    <div className="relative z-20 text-center">
                      <div className="w-12 h-12 mx-auto mb-3 bg-purple/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <stat.icon className="w-6 h-6 text-purple" />
                      </div>
                      <div className="text-[20px] md:text-[24px] font-bold font-ao text-dark dark:text-light mb-1">
                        {stat.number}
                      </div>
                      <div className="text-[10px] md:text-[12px] font-switzer font-light text-dark/70 dark:text-light/70 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
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
            <h2 className="inline-flex center gap-x-[10px] items-center font-normal text-dark dark:text-light uppercase text-[14px] tracking-[.42px] mb-6">
              <div className="flex flex-col space-y-[6px]">
                <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
                <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
              </div>
              Contact Methods
            </h2>
            <p className="text-dark/70 dark:text-light/70 font-switzer font-light text-[14px] md:text-[16px] lg:text-[18px] max-w-2xl">
              Choose your preferred way to reach out. I'm available through multiple channels 
              to make communication as convenient as possible for you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <a
                  href={method.link}
                  target={method.link.startsWith('http') ? '_blank' : undefined}
                  rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="relative bg-light dark:bg-dark rounded-3xl p-8 overflow-hidden block h-full border border-lightBorderColor dark:border-darkBorderColor hover:border-purple/30 transition-all duration-300 group-hover:scale-105"
                >
                  <BlurBG className="rounded-3xl" />
                  
                  <div className="relative z-20">
                    <div className="w-16 h-16 bg-purple/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple/20 transition-all duration-300">
                      <method.icon className="w-8 h-8 text-purple" />
                    </div>
                    
                    <h3 className="text-[20px] md:text-[24px] font-ao font-bold text-dark dark:text-light mb-2">
                      {method.label}
                    </h3>
                    
                    <p className="text-purple font-switzer font-medium text-[16px] md:text-[18px] mb-3 group-hover:text-purple/80 transition-colors duration-300">
                      {method.value}
                    </p>
                    
                    <p className="text-dark/70 dark:text-light/70 font-switzer font-light text-[14px] leading-relaxed">
                      {method.description}
                    </p>
                  </div>

                  {/* Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple/5 via-transparent to-purple/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              </motion.div>
            ))}
          </div>
        </Container>
      </motion.section>

      {/* Availability Section */}
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
            {/* Availability Schedule */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-purple" />
                <h2 className="text-[24px] md:text-[28px] lg:text-[32px] font-ao font-bold text-dark dark:text-light">
                  Availability
                </h2>
              </div>
              
              <p className="text-dark/70 dark:text-light/70 font-switzer font-light text-[16px] md:text-[18px] leading-relaxed mb-8">
                I'm available during these hours for calls, meetings, and urgent project discussions.
              </p>

              <div className="space-y-4">
                {availability.map((schedule, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative bg-light dark:bg-dark rounded-2xl p-6 overflow-hidden"
                  >
                    <BlurBG className="rounded-2xl" />
                    <div className="relative z-20 flex justify-between items-center">
                      <div>
                        <h4 className="text-dark dark:text-light font-switzer font-medium text-[16px] md:text-[18px] mb-1">
                          {schedule.day}
                        </h4>
                        <p className="text-dark/60 dark:text-light/60 font-switzer font-light text-[14px] uppercase tracking-wider">
                          Pakistan Time {schedule.timezone && `(${schedule.timezone})`}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`font-switzer font-medium text-[16px] md:text-[18px] ${
                          schedule.time === 'Closed' 
                            ? 'text-red-500' 
                            : 'text-green-500'
                        }`}>
                          {schedule.time}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Location & Response Info */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-purple" />
                <h2 className="text-[24px] md:text-[28px] lg:text-[32px] font-ao font-bold text-dark dark:text-light">
                  Location & Response
                </h2>
              </div>

              <div className="space-y-6">
                <div className="relative bg-light dark:bg-dark rounded-2xl p-6 overflow-hidden">
                  <BlurBG className="rounded-2xl" />
                  <div className="relative z-20">
                    <h4 className="text-dark dark:text-light font-switzer font-medium text-[18px] md:text-[20px] mb-3">
                      📍 Based in Pakistan
                    </h4>
                    <p className="text-dark/70 dark:text-light/70 font-switzer font-light text-[16px] leading-relaxed">
                      Working remotely with clients worldwide. I'm experienced in collaborating 
                      across different time zones and cultures.
                    </p>
                  </div>
                </div>

                <div className="relative bg-light dark:bg-dark rounded-2xl p-6 overflow-hidden">
                  <BlurBG className="rounded-2xl" />
                  <div className="relative z-20">
                    <h4 className="text-dark dark:text-light font-switzer font-medium text-[18px] md:text-[20px] mb-3">
                      ⚡ Quick Response Time
                    </h4>
                    <p className="text-dark/70 dark:text-light/70 font-switzer font-light text-[16px] leading-relaxed">
                      I typically respond to emails within 24 hours and WhatsApp messages 
                      within a few hours during business days.
                    </p>
                  </div>
                </div>

                <div className="relative bg-light dark:bg-dark rounded-2xl p-6 overflow-hidden">
                  <BlurBG className="rounded-2xl" />
                  <div className="relative z-20">
                    <h4 className="text-dark dark:text-light font-switzer font-medium text-[18px] md:text-[20px] mb-3">
                      🎯 Project-Focused
                    </h4>
                    <p className="text-dark/70 dark:text-light/70 font-switzer font-light text-[16px] leading-relaxed">
                      Every project gets my full attention. I believe in clear communication 
                      and regular updates throughout the development process.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </motion.section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-20">
        <Container className="px-4 lg:px-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="inline-flex center gap-x-[10px] items-center font-normal text-dark dark:text-light uppercase text-[14px] tracking-[.42px] mb-6 justify-center">
              <div className="flex flex-col space-y-[6px]">
                <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
                <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
              </div>
              Send a Message
            </h2>
            <h3 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold font-ao text-dark dark:text-light mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-dark/70 dark:text-light/70 font-switzer font-light text-[16px] md:text-[18px] leading-relaxed max-w-2xl mx-auto">
              Fill out the form below with your project details, and I'll get back to you 
              within 24 hours with a detailed response.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ContactForm />
          </motion.div>
        </Container>
      </section>
    </>
  );
};

export default ContactPage;