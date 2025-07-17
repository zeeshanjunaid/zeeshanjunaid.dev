import ProjectsList from "@/data/work";

interface ProjectLayoutProps {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return ProjectsList.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = ProjectsList.find((p) => p.slug === params.slug);
  
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.name} - Project Case Study`,
    description: project.description || `Detailed case study of ${project.name} project by Zeeshan Junaid`,
  };
}

export default function ProjectLayout({ children }: ProjectLayoutProps) {
  return <>{children}</>;
}