import { FaShopify, FaWordpressSimple } from "react-icons/fa";
import { MdCode, MdDesignServices, MdOutlineSpeed } from "react-icons/md";

import { IconType } from "react-icons";
import { IoPulseOutline } from "react-icons/io5";
import { TbBrandWebflow } from "react-icons/tb";

interface ServicesCategoriesProps {
  name: string;
  slug: string;
  icon?: IconType;
}
export const servicesCategories: ServicesCategoriesProps[] = [
  {
    name: "ui/ux design",
    slug: "uiux-design",
    icon: MdDesignServices,
  },
  {
    name: "frontend development",
    slug: "frontend-development",
    icon: MdCode,
  },
  {
    name: "wordpress development",
    slug: "wordpress-development",
    icon: FaWordpressSimple,
  },
  {
    name: "shopify development",
    slug: "shopify-development",
    icon: FaShopify,
  },
  {
    name: "webflow development",
    slug: "webflow-development",
    icon: TbBrandWebflow,
  },
  {
    name: "speed optimization",
    slug: "speed-optimization",
    icon: MdOutlineSpeed,
  },
  {
    name: "seo optimization",
    slug: "seo-optimization",
    icon: IoPulseOutline,
  },
];
export interface ServicesCardProps {
  name: string;
  tagline: string;
  description: string;
  img: string;
  subServicesTitle: string;
  subServices: string[];
  resultsTitle: string;
  results: string;
  ctaLink: string;
  ctaText: string;
  ctaInfo: string;
}
export const servicesCards: ServicesCardProps[] = [
  {
    name: "UI/UX Design",
    tagline: "Empower Your Digital Presence with Intuitive Design",
    description:
      "At the heart of every successful digital project lies exceptional UI/UX design. Our approach combines aesthetics with functionality, creating seamless experiences that drive user engagement and satisfaction. From initial research to final implementation, we ensure every design element is crafted to meet your business goals and delight your users.",
    img: "/images/services/design.webp",
    subServicesTitle: "What do i Offer",
    subServices: [
      "User Research & Persona Development",
      "Wireframing & Prototyping",
      "Visual Design & Brand Integration",
      "Usability Testing & Feedback Incorporation",
      "Responsive Design for All Devices",
    ],
    resultsTitle: "Outcome for You",
    results:
      "Engaging interfaces that captivate your audience, reduce bounce rates, and enhance user retention.",
    ctaLink: "uiux-design",
    ctaText: "Dive into my design depths",
    ctaInfo: " for pricing and profound insights.",
  },
  {
    name: "Frontend Development in React",
    tagline: "Build Fast, Scalable, and Interactive Web Experiences",
    description:
      "Leverage the power of modern web technologies with our React, NextJS, and GatsbyJS development services. Specializing in creating high-performance, SEO-friendly websites and applications, we ensure your project not only looks great but also ranks well and loads quickly across all platforms.",
    img: "/images/services/frontend-dev.webp",
    subServicesTitle: "What do i Offer",
    subServices: [
      "Single Page Applications (SPA)",
      "Static Site Generation (SSG)",
      "Dynamic Web Applications",
      "API Integration & State Management",
      "Fullstack development with Next.JS",
    ],
    resultsTitle: "Outcome for You",
    results:
      "Cutting-edge web solutions that offer unparalleled speed, scalability, and interactivity, enhancing user engagement and satisfaction.",
    ctaLink: "frontend-development",
    ctaText: "Step into the future",
    ctaInfo: "with our detailed guide and pricing.",
  },
];
