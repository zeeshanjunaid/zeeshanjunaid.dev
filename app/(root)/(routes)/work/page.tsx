import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { createClient } from "@/prismicio";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("work");

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("work");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
