import { Container } from "@/components/container";
import { Metadata } from "next";
import ServiceCard from "./service-card";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { createClient } from "@/prismicio";
import { servicesCards } from "@/data/services";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("services");

  return (
    <>
      <SliceZone slices={page.data.slices} components={components} />
      <section>
        <Container className="flex flex-col gap-y-12 space-y-6 px-5 py-12 md:px-7 lg:px-0">
          {servicesCards.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </Container>
      </section>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("services");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
