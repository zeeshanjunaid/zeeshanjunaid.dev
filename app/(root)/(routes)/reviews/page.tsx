import ReviewsList, { VideoReviewsList } from "@/data/reviews";

import { Container } from "@/components/container";
import MasonryLayout from "../components/masonry-layout";
import React from "react";
import TestimonialCard from "../components/testimonial-card";
import VideoModal from "../components/video-modal";

export const metadata = {
  title: "Feedback",
};
const ReviewsPage = () => {
  return (
    <>
      <div className="border-b-[1px] border-b-borderDarkColor pb-12">
        <Container
          className="
        px-4 lg:px-0     
        flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-2.5
        "
        >
          <div className="flex flex-col gap-y-4 md:max-w-[70%]">
            <h2 className="text-[28px] md:text-[36px] lg:text-[44px] font-bold font-ao text-dark dark:text-light">
              Exceeding Expectations
            </h2>
            <p className="font-light text-[16px] md:text-[18px] lg:text-[20px] leading-snug">
              Dive into these testimonials to explore the profound connections
              and success stories that resonate beneath the surface of my
              products/services
            </p>
          </div>
        </Container>
      </div>
      <section className="mt-12">
        <Container className="px-4 lg:px-0 flex flex-col gap-5">
          <div className="flex justify-start items-center gap-5 overflow-x-scroll pb-5">
            {VideoReviewsList.map(
              ({ client, video, profile, country }, index) => (
                <VideoModal
                  key={index}
                  client={client}
                  profile={profile}
                  video={video}
                  country={country}
                />
              ),
            )}
          </div>
          <MasonryLayout>
            {ReviewsList.map((review, index) => (
              <div key={index} className="masonry-item">
                <TestimonialCard key={index} review={review} className="" />
              </div>
            ))}
          </MasonryLayout>
        </Container>
      </section>
    </>
  );
};

export default ReviewsPage;