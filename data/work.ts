export interface Project {
  name: string;
  imgUrl?: string;
  link: string;
  year: number;
  tags: string[];
  selected?: boolean;
  archived?: boolean;
}
const ProjectsList: Project[] = [
  {
    name: "Ajras",
    imgUrl: "/images/projects/ajras.jpg",
    link: "https://ajras.com",
    year: 2024,
    tags: ["frontend"],
    selected: true,
  },
  {
    name: "customs",
    imgUrl: "/images/projects/customs.jpg",
    link: "https://customs-frontend-git-homepage-design-passage-protocol.vercel.app/",
    year: 2023,
    tags: ["ui/ux", "frontend"],
    selected: true,
  },
  {
    name: "Roa’a Technologies",
    imgUrl: "/images/projects/roaa.jpg",
    link: "https://roaa-zeeshanjunaid.vercel.app/",
    year: 2023,
    tags: ["ui/ux", "frontend", "animations"],
    selected: true,
  },
  {
    name: "drillbit",
    imgUrl: "/images/projects/drillbit.jpg",
    link: "https://www.drillbit.xyz/",
    year: 2023,
    tags: ["ui/ux", "frontend"],
    selected: true,
  },
  {
    name: "Freestyle",
    imgUrl: "/images/projects/freestyle.jpg",
    link: "https://freestyle.passage.xyz/",
    year: 2022,
    tags: ["frontend", "animations"],
  },
  {
    name: "Nova AI",
    imgUrl: "/images/projects/nova.jpg",
    link: "https://novaai-one.vercel.app",
    year: 2022,
    tags: ["frontend", "animations"],
  },
  {
    name: "calaways solutions",
    imgUrl: "/images/projects/calaways-screen.jpg",
    link: "https://calawaysolutions.com/",
    year: 2022,
    tags: ["fullstack development"],
    selected: true,
  },
  {
    name: "abstrkt",
    imgUrl: "/images/projects/absrkt-pro.jpg",
    link: "https://abstrkt.vercel.app/homepage-design",
    year: 2022,
    tags: ["frontend", "ui/ux"],
    selected: true,
  },
  {
    name: "digital x twins",
    imgUrl: "/images/projects/digital-twins.jpg",
    link: "https://digitalxtwin.vercel.app",
    year: 2022,
    tags: ["ui/ux", "frontend", "animations"],
    archived: true,
  },
  {
    name: "ecocart",
    imgUrl: "/images/projects/ecocart-screen.jpg",
    link: "https://ecocart.io",
    year: 2021,
    tags: ["ui/ux", "frontend", "backend"],
    archived: true,
  },
  {
    name: "amberx",
    imgUrl: "/images/projects/amberx.jpg",
    link: "https://amberx.vercel.app/",
    year: 2020,
    tags: ["frontend"],
    archived: true,
  },
  {
    name: "stevenland",
    imgUrl: "/images/projects/stevenland-screen.jpg",
    link: "https://stevenland.com/",
    year: 2019,
    tags: ["fullstack development", "support", "maintenance"],
    archived: true,
  },
];

export default ProjectsList;
