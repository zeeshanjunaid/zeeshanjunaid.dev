export interface Project {
  name: string;
  imgUrl?: string;
  link: string;
  year: number;
  tags: string[];
  selected?: boolean;
  archived?: boolean;
  images?: string[];
}
const ProjectsList: Project[] = [
  {
    name: "Aumentogram",
    imgUrl: "/images/projects/leoboost.jpg",
    link: "https://www.aumentogram.com",
    year: 2024,
    tags: ["ui/ux", "frontend", "backend"],
  },
  {
    name: "Healing from grief",
    imgUrl: "/images/projects/audrey.jpg",
    link: "healingfromgrief.org",
    year: 2024,
    tags: ["ui/ux", "frontend", "backend"],
  },
  {
    name: "Pure Energy Dance",
    imgUrl: "/images/projects/pure-energydance.jpg",
    link: "https://pure-energydance.com",
    year: 2024,
    tags: ["ui/ux", "frontend", "backend"],
  },
  {
    name: "Reno Leaders",
    imgUrl: "/images/projects/reno-leaders.jpg",
    link: "https://renoleaders.com",
    year: 2024,
    tags: ["frontend", "animations", "backend"],
    selected: true,
  },
  {
    name: "AGM Renovations",
    imgUrl: "/images/projects/agm.jpg",
    link: "https://www.agmrenovations.com",
    year: 2024,
    tags: ["frontend", "backend"],
    selected: true,
  },
  {
    name: "Ajras",
    imgUrl: "/images/projects/ajras.jpg",
    link: "https://ajras.com",
    year: 2024,
    tags: ["frontend"],
  },
  {
    name: "Customs Royalty Checker",
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
  },
  {
    name: "drillbit",
    imgUrl: "/images/projects/drillbit.jpg",
    images: [
      "/images/projects/drillbit2.jpg",
      "/images/projects/drillbit3.jpg",
      "/images/projects/drillbit4.jpg",
      "/images/projects/drillbit5.jpg",
    ],
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
    selected: true,
  },
  {
    name: "expandage",
    imgUrl: "/images/projects/expendage.jpg",
    link: "https://expandage.netlify.app",
    year: 2020,
    tags: ["frontend", "animations"],
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
    selected: true,
  },
];

export default ProjectsList;
