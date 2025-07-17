"use client";

import { BlurBG } from "@/components/blur-bg";
import React from "react";
import { SkillProps } from "@/data/about";
import { motion } from "framer-motion";

interface SkillRowProps {
  skillset: any;
}

const SkillRow = ({ skillset }: SkillRowProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <motion.ul 
        variants={containerVariants}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {skillset.skills.map(({ link, name, icon: Icon }: SkillProps) => (
          <motion.li 
            key={name} 
            variants={itemVariants}
            className="group"
          >
            {link ? (
              <a
                className="relative flex items-center gap-3 p-4 bg-light dark:bg-dark rounded-2xl border border-lightBorderColor dark:border-darkBorderColor hover:border-purple/30 hover:bg-purple/5 transition-all duration-300 group overflow-hidden"
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BlurBG className="rounded-2xl" />
                <div className="relative z-20 flex items-center gap-3 w-full">
                  {Icon && (
                    <div className="w-8 h-8 flex items-center justify-center bg-purple/10 rounded-lg group-hover:bg-purple/20 group-hover:scale-110 transition-all duration-300">
                      <Icon size="16" className="text-purple" />
                    </div>
                  )}
                  <span className="text-dark dark:text-light text-[14px] md:text-[16px] font-light group-hover:text-purple transition-colors duration-300 flex-1">
                    {name}
                  </span>
                </div>
              </a>
            ) : (
              <div className="relative flex items-center gap-3 p-4 bg-light dark:bg-dark rounded-2xl border border-lightBorderColor dark:border-darkBorderColor hover:border-purple/30 hover:bg-purple/5 transition-all duration-300 group overflow-hidden cursor-default">
                <BlurBG className="rounded-2xl" />
                <div className="relative z-20 flex items-center gap-3 w-full">
                  {Icon && (
                    <div className="w-8 h-8 flex items-center justify-center bg-purple/10 rounded-lg group-hover:bg-purple/20 group-hover:scale-110 transition-all duration-300">
                      <Icon size="16" className="text-purple" />
                    </div>
                  )}
                  <span className="text-dark dark:text-light text-[14px] md:text-[16px] font-light group-hover:text-purple transition-colors duration-300 flex-1">
                    {name}
                  </span>
                </div>
              </div>
            )}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default SkillRow;
