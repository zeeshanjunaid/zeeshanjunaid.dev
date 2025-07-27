import { MetadataRoute } from "next";
import { getAllPostsMeta } from "@/lib/posts";
import ProjectsList from "@/data/work";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://zeeshanjunaid.dev";

  const staticRoutes = [
    { url: `${baseUrl}`, priority: 1 },
    { url: `${baseUrl}/about`, priority: 0.9 },
    { url: `${baseUrl}/services`, priority: 0.5 },
    { url: `${baseUrl}/work`, priority: 0.8 },
    { url: `${baseUrl}/reviews`, priority: 0.7 },
    { url: `${baseUrl}/contact`, priority: 0.6 },
  ].map((route) => ({
    ...route,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
  }));

  const postsMeta = await getAllPostsMeta();
  const blogPostRoutes = postsMeta.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const projectRoutes = ProjectsList.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogPostRoutes, ...projectRoutes];
}
