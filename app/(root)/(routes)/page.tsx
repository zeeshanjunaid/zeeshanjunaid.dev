import { Hero } from "./components/hero";
import ProjectsList from "@/data/work";
import ReachOut from "./components/reach-out";
import { WorkList } from "./components/work-list";
export default function Home() {
  const selectedProjects = ProjectsList.filter((project) => project.selected);
  const archivedProjects = ProjectsList.filter((project) => project.archived);
  return (
    <>
      <Hero />
      <WorkList title="selected work" projects={selectedProjects} />
      <WorkList title="archived" projects={archivedProjects} />
      <ReachOut />
    </>
  );
}
