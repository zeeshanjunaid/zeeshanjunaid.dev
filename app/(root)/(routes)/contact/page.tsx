import ContactForm from "./contact-form";
import { Container } from "@/components/container";
import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { createClient } from "@/prismicio";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("contact");

  return (
    <>
      <SliceZone slices={page.data.slices} components={components} />
      <section>
        <Container className="px-4 pt-12  lg:px-0">
          <ContactForm />
        </Container>
      </section>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("contact");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
