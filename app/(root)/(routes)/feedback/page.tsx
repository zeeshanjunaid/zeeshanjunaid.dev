import ReviewsList, { VideoReviewsList } from "@/data/reviews";

import { Container } from "@/components/container";
import MasonryLayout from "./masonry-layout";
import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import TestimonialCard from "./testimonial-card";
import VideoModal from "./video-modal";
import { components } from "@/slices";
import { createClient } from "@/prismicio";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("feedback");

  return (
    <>
      <SliceZone slices={page.data.slices} components={components} />
      <section className="mt-12">
        <Container className="flex flex-col gap-5 px-4 lg:px-0">
          <div className="flex items-center justify-start gap-5 overflow-x-scroll pb-5">
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
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("feedback");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
