"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlurBG } from "@/components/blur-bg";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import ReactPlayer from "react-player/youtube";
import { Skeleton } from "@/components/ui/skeleton";
import { User2Icon, Play, X, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const VideoModal = ({
  video,
  client,
  profile,
  country,
}: {
  video: string;
  client: string;
  profile?: string;
  country?: {
    code: string;
    name: string;
  };
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  const handleVideoStart = () => {
    setIsPlaying(true);
  };

  const handleModalOpen = (open: boolean) => {
    setIsModalOpen(open);
    if (open) {
      setIsPlaying(true); // Auto-start video when modal opens
    } else {
      setIsPlaying(false); // Stop video when modal closes
    }
  };

  return (
    <div className="group">
      <Dialog open={isModalOpen} onOpenChange={handleModalOpen}>
        <div className="flex flex-col gap-4 justify-center items-center min-w-[160px] max-w-[200px]">
          <DialogTrigger asChild>
            <motion.button 
              className="relative group/button focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2 rounded-3xl"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Main Container */}
              <div className="relative w-[120px] h-[120px] lg:h-[140px] lg:w-[140px] rounded-3xl overflow-hidden">
                {/* Background Gradient Border */}
                <motion.div 
                  className="absolute inset-0 video-cta-gradient p-[3px] rounded-3xl"
                  animate={{
                    rotate: isHovered ? 360 : 0,
                  }}
                  transition={{
                    duration: 2,
                    ease: "linear",
                    repeat: isHovered ? Infinity : 0,
                  }}
                >
                  <div className="w-full h-full bg-light dark:bg-dark rounded-3xl" />
                </motion.div>

                {/* Profile Image Container */}
                <div className="absolute inset-[3px] rounded-3xl overflow-hidden bg-light dark:bg-dark z-30">
                  <BlurBG className="rounded-3xl" />
                  
                  {profile ? (
                    <div className="relative w-full h-full">
                      {!isLoaded && (
                        <Skeleton className="w-full h-full rounded-3xl" />
                      )}
                      <Image
                        fill
                        sizes="140px"
                        src={profile}
                        className="object-cover z-20 transition-transform duration-700 group-hover/button:scale-110"
                        alt={client}
                        onLoad={() => setIsLoaded(true)}
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-25" />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center relative z-20">
                      <User2Icon size={48} className="text-dark dark:text-light group-hover/button:scale-110 transition-transform duration-300" />
                    </div>
                  )}
                </div>
                
                {/* Play Button Overlay */}
                <motion.div 
                  className="absolute inset-[3px] flex items-center justify-center z-40 rounded-3xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="w-12 h-12 lg:w-14 lg:h-14 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    animate={{
                      scale: isHovered ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: isHovered ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  >
                    <Play className="w-5 h-5 lg:w-6 lg:h-6 text-purple ml-1" fill="currentColor" />
                  </motion.div>
                </motion.div>

                {/* Pulse Effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-purple/30"
                  animate={{
                    scale: isHovered ? [1, 1.1, 1] : 1,
                    opacity: isHovered ? [0.5, 0, 0.5] : 0,
                  }}
                  transition={{
                    duration: 2,
                    repeat: isHovered ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.button>
          </DialogTrigger>
          
          {/* Client Info */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-dark dark:text-light font-switzer font-semibold text-[14px] md:text-[16px] mb-2 leading-tight">
              {client}
            </h3>
            {country && (
              <motion.div 
                className="flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <ReactCountryFlag
                  countryCode={country.code}
                  style={{
                    fontSize: "1.1rem",
                  }}
                  aria-label={country.name}
                />
                <span className="text-dark/70 dark:text-light/70 font-switzer font-light text-[12px] md:text-[14px]">
                  {country.name}
                </span>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Enhanced Modal */}
        <DialogContent className="bg-light dark:bg-dark max-w-4xl w-[95vw] border border-lightBorderColor dark:border-darkBorderColor rounded-3xl p-0 overflow-hidden [&>button]:hidden">
          <div className="relative">
            <BlurBG className="rounded-3xl" />
            
            {/* Modal Header */}
            <DialogHeader className="relative z-20 p-6 pb-4">
              <div className="flex items-center gap-4">
                <DialogTitle className="flex items-center gap-3 font-ao font-bold text-[18px] md:text-[20px] text-dark dark:text-light">
                  <div className="w-10 h-10 rounded-2xl overflow-hidden relative">
                    {profile ? (
                      <Image
                        src={profile}
                        fill
                        sizes="40px"
                        className="object-cover"
                        alt={client}
                      />
                    ) : (
                      <div className="w-full h-full bg-purple/10 flex items-center justify-center">
                        <User2Icon className="w-5 h-5 text-purple" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      {client}
                      {country && (
                        <ReactCountryFlag
                          countryCode={country.code}
                          style={{ fontSize: "1.2rem" }}
                          aria-label={country.name}
                        />
                      )}
                    </div>
                    {country && (
                      <p className="text-[12px] font-switzer font-light text-dark/60 dark:text-light/60 uppercase tracking-wider">
                        {country.name}
                      </p>
                    )}
                  </div>
                </DialogTitle>
                
                {/* Custom Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleModalOpen(false)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-2xl hover:bg-red-500/10 text-dark dark:text-light hover:text-red-500 z-50"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </DialogHeader>

            {/* Video Container */}
            <DialogDescription asChild className="relative z-20 p-6">
              <div className="relative rounded-2xl overflow-hidden bg-black mb-4">
                <div className="aspect-video">
                  <ReactPlayer
                    width="100%"
                    height="100%"
                    controls={true}
                    playsinline={true}
                    playing={isModalOpen}
                    muted={isMuted}
                    url={video}
                    onStart={handleVideoStart}
                    onEnded={handleVideoEnd}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    config={{
                      youtube: {
                        playerVars: {
                          showinfo: 1,
                          modestbranding: 1,
                          rel: 0,
                          autoplay: 1,
                        }
                      }
                    }}
                  />
                </div>
                
                {/* Video Controls Overlay */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-10 h-10 rounded-2xl bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white border border-white/20"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </DialogDescription>

            {/* Video Info Footer */}
            <div className="relative z-20 px-6 pb-6 border-t border-lightBorderColor dark:border-darkBorderColor pt-4">
              <div className="flex items-center justify-center">
                <span className="text-[12px] text-dark/60 dark:text-light/60">Client Testimonial Video • Click outside or press ESC to close</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideoModal;