"use client";

import { MdCode, MdDesignServices } from "react-icons/md";

import { BlurBG } from "@/components/blur-bg";
import { Container } from "@/components/container";
import CustomLink from "@/components/custom-link";
import Link from "next/link";
import React from "react";
import { servicesCategories } from "@/data/services";
import { motion } from "framer-motion";

const Services = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const serviceItemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };
  return (
    <Container className="flex flex-col gap-y-3 px-4 md:px-7 lg:px-0 mt-[3.125rem]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        <motion.h2 
          variants={itemVariants}
          className="inline-flex center gap-x-[10px] items-center font-normal text-dark dark:text-light uppercase text-[14px] tracking-[.42px]"
        >
          <div className="flex flex-col space-y-[6px]">
            <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
            <span className="bg-dark dark:bg-light w-[18px] h-[1px]" />
          </div>
          services
        </motion.h2>
        
        <motion.div 
          variants={itemVariants}
          className="px-5 md:px-6 py-8 w-full bg-light dark:bg-dark rounded-3xl relative overflow-hidden group hover:shadow-md transition-all duration-200"
        >
          <BlurBG className="rounded-3xl" />
          
          {/* Subtle hover gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple/3 via-transparent to-purple/3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-3xl z-10" />
          
          <motion.ul 
            variants={containerVariants}
            className="w-full flex flex-wrap gap-2 md:gap-3 items-center z-20 relative"
          >
            {servicesCategories.map(({ name, icon: Icon }, index) => (
              <React.Fragment key={index}>
                <motion.li 
                  variants={serviceItemVariants}
                  whileHover={{ scale: 1.02, y: -1 }}
                  transition={{ duration: 0.2 }}
                  className="uppercase font-ao text-dark dark:text-light text-[12px] md:text-[14px] flex items-center gap-x-1 md:gap-x-2 px-4 py-2 w-max rounded-xl hover:bg-purple/5 transition-all duration-200 cursor-default"
                >
                  {Icon && (
                    <motion.div
                      whileHover={{ rotate: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className="text-purple -mt-[3px]" size="18" />
                    </motion.div>
                  )}
                  {name}
                </motion.li>
                {index < servicesCategories.length - 1 && (
                  <motion.li 
                    variants={serviceItemVariants}
                    className="text-[20px] font-switzer font-light text-dark/50 dark:text-light/40"
                  >
                    /
                  </motion.li>
                )}
              </React.Fragment>
            ))}

            <motion.li variants={serviceItemVariants}>
              <CustomLink
                className="text-[14px] font-ao text-dark dark:text-light uppercase px-2 py-2 flex items-center hover:text-purple transition-colors duration-200"
                link="/services"
                text="See All Solutions"
                internal
              />
            </motion.li>
          </motion.ul>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default Services;
