export interface Project {
  name: string;
  imgUrl?: string;
  blurDataUrl?: string;
  link: string;
  year: number;
  tags: string[];
  selected?: boolean;
  archived?: boolean;
}
const ProjectsList: Project[] = [
  {
    name: "customs",
    imgUrl: "/images/projects/customs.jpg",
    blurDataUrl:
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcOudNPQAGyQKuaerS4QAAAABJRU5ErkJggg==",
    link: "https://customs-frontend-git-homepage-design-passage-protocol.vercel.app/",
    year: 2023,
    tags: ["ui/ux", "frontend"],
    selected: true,
  },
  {
    name: "Roa’a Technologies",
    imgUrl: "/images/projects/roaa.jpg",
    blurDataUrl:
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8dKGoHgAHZQKl8LkmDwAAAABJRU5ErkJggg==",
    link: "https://roaa-zeeshanjunaid.vercel.app/",
    year: 2023,
    tags: ["ui/ux", "frontend", "animations"],
    selected: true,
  },
  {
    name: "drillbit",
    imgUrl: "/images/projects/drillbit.jpg",
    blurDataUrl:
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP893ZyPQAIbgL/FL8ATwAAAABJRU5ErkJggg==",
    link: "https://www.drillbit.xyz/",
    year: 2023,
    tags: ["ui/ux", "frontend"],
    selected: true,
  },
  {
    name: "Nova AI",
    imgUrl: "/images/projects/nova.jpg",
    blurDataUrl:
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPsN86pBwAENgGv6t/+DgAAAABJRU5ErkJggg==",
    link: "https://stevenland.com/",
    year: 2022,
    tags: ["frontend", "animations"],
  },
  {
    name: "calaways sol",
    link: "https://calawaysolutions.com/",
    year: 2022,
    tags: ["fullstack development"],
    selected: true,
  },
  {
    name: "abstrkt",
    link: "https://abstrkt.vercel.app/homepage-design",
    year: 2022,
    tags: ["frontend", "ui/ux"],
    selected: true,
  },
  {
    name: "digital x twins",
    link: "https://digitalxtwin.vercel.app",
    year: 2022,
    tags: ["ui/ux", "frontend", "animations"],
    archived: true,
  },
  {
    name: "ecocart",
    link: "https://ecocart.io",
    year: 2021,
    tags: ["ui/ux", "frontend", "backend"],
    archived: true,
  },
  {
    name: "amberx",
    link: "https://amberx.vercel.app/",
    year: 2020,
    tags: ["frontend"],
    archived: true,
  },
  {
    name: "stevenland",
    link: "https://stevenland.com/",
    year: 2019,
    tags: ["fullstack development", "support", "maintenance"],
    archived: true,
  },
];

export default ProjectsList;
