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
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <div className="flex flex-col gap-2.5 justify-center items-center">
        <DialogTrigger>
          <div className="relative w-[100px] h-[100px] lg:h-[120px] lg:w-[120px] rounded-full video-cta-gradient p-[2px]">
            <div className="w-full h-full relative bg-light dark:bg-dark rounded-full overflow-hidden flex justify-center items-center">
              {profile ? (
                <>
                  {!isLoaded && (
                    <Skeleton className="w-full h-full rounded-full" />
                  )}
                  <Image
                    fill
                    src={profile}
                    className="object-cover z-20 w-[100px] h-[100px] lg:h-[120px] lg:w-[120px] rounded-full"
                    alt={client}
                    onLoad={() => setIsLoaded(false)}
                  />
                </>
              ) : (
                <User2Icon size={48} className="text-dark dark:text-light" />
              )}
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
