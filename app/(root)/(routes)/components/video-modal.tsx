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

import { BlurBG } from "@/components/blur-bg";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import ReactPlayer from "react-player/youtube";
import { Skeleton } from "@/components/ui/skeleton";
import { User2Icon } from "lucide-react";

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

  return (
    <div className="group">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <div className="flex flex-col gap-4 justify-center items-center min-w-[140px]">
          <DialogTrigger asChild>
            <button className="relative group/button">
              <div className="relative w-[100px] h-[100px] lg:h-[120px] lg:w-[120px] rounded-full video-cta-gradient p-[2px] group-hover/button:scale-105 transition-transform duration-300">
                <div className="w-full h-full relative bg-light dark:bg-dark rounded-full overflow-hidden flex justify-center items-center">
                  {profile ? (
                    <>
                      {!isLoaded && (
                        <Skeleton className="w-full h-full rounded-full" />
                      )}
                      <Image
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        src={profile}
                        className="object-cover z-20 w-[100px] h-[100px] lg:h-[120px] lg:w-[120px] rounded-full group-hover/button:scale-110 transition-transform duration-500"
                        alt={client}
                        onLoad={() => setIsLoaded(false)}
                      />
                    </>
                  ) : (
                    <User2Icon size={48} className="text-dark dark:text-light group-hover/button:scale-110 transition-transform duration-300" />
                  )}
                </div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full opacity-0 group-hover/button:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </button>
          </DialogTrigger>
          
          <div className="text-center">
            <h3 className="text-dark dark:text-light font-switzer font-medium text-[14px] md:text-[16px] mb-1">
              {client}
            </h3>
            {country && (
              <div className="flex items-center justify-center gap-1.5">
                <ReactCountryFlag
                  countryCode={country.code}
                  style={{
                    fontSize: "1rem",
                  }}
                  aria-label={country.name}
                />
                <span className="text-dark/60 dark:text-light/60 font-switzer font-light text-[12px] md:text-[14px]">
                  {country.name}
                </span>
              </div>
            )}
          </div>
        </div>

        <DialogContent className="bg-light dark:bg-dark min-w-max border border-lightBorderColor dark:border-darkBorderColor">
          <DialogHeader>
            <DialogTitle className="mb-5 flex items-center gap-x-1.5 font-ao font-bold text-[18px] md:text-[20px] text-dark dark:text-light">
              {client}
              {country && (
                <span className="-mt-[2px]">
                  <ReactCountryFlag
                    countryCode={country.code}
                    style={{
                      fontSize: "1.25rem",
                    }}
                    aria-label={country.name}
                  />
                </span>
              )}
            </DialogTitle>
            <DialogDescription asChild className="h-auto max-w-full">
              <div className="relative rounded-2xl overflow-hidden">
                <ReactPlayer
                  width={"100%"}
                  height={"100%"}
                  controls={false}
                  playsinline={true}
                  className="min-h-[300px] md:min-h-[400px]"
                  playing={isModalOpen}
                  url={video}
                  onEnded={() => setIsModalOpen(false)}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideoModal;
            </div>
          </div>
        </DialogTrigger>
        <h2 className="text-dark dark:text-light font-light font-switzer text-[12px] text-center md:text-[14px] lg:text-[16px]">
          {client}
        </h2>
      </div>

      <DialogContent className="bg-light dark:bg-dark min-w-max">
        <DialogHeader>
          <DialogTitle className="mb-5 flex items-center gap-x-1.5">
            {client}
            {country && (
              <span className="-mt-[2px]">
                <ReactCountryFlag
                  countryCode={country.code}
                  style={{
                    fontSize: "1.25rem",
                  }}
                  aria-label={country.name}
                />
              </span>
            )}
          </DialogTitle>
          <DialogDescription asChild className="h-auto max-w-full">
            <ReactPlayer
              width={"100%"}
              height={"100%"}
              controls={false}
              playsinline={true}
              className="min-h-[300px]"
              playing={isModalOpen}
              url={video}
              onEnded={() => setIsModalOpen(false)}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
