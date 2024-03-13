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
  slug: string;
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
    slug: "uiux-design",
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
    slug: "frontend-development",
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
  {
    slug: 'wordpress-development',
    name: "WordPress Development",
    tagline: "Custom WordPress Solutions Tailored to Your Needs",
    description:
      "From bespoke themes to custom plugins, our WordPress development services are designed to elevate your website's functionality and aesthetic appeal. Whether you're looking to launch a blog, an e-commerce platform, or a corporate website, we provide tailored solutions that align with your vision and business objectives.",
    img: "/images/services/wp-dev.webp",
    subServicesTitle: "What do i Offer",
    subServices: [
      "Website Redesigning & Theme Customization",
      "Performance Optimization & SEO",
      "Security Enhancements & Maintenance",
      "WooCommerce Integration",
    ],
    resultsTitle: "Outcome for You",
    results:
      "A robust, scalable WordPress website that combines functionality, beauty, and ease of use, driving growth and user engagement.",
    ctaLink: "wordpress-development",
    ctaText: "Unravel the details",
    ctaInfo: "of custom solutions and pricing.",
  },
  {
    slug: 'webflow-development',
    name: "Webflow Development",
    tagline: "Unlock the Potential of Webflow for Stunning Websites",
    description:
      "Embrace the flexibility and power of Webflow with our custom development services. Ideal for businesses looking for visually impressive, easily manageable websites without the complexity of traditional development processes. Our expertise ensures your site is not just a visual masterpiece but also a robust digital asset optimized for performance and conversions.",
    img: "/images/services/webflow-dev.webp",
    subServicesTitle: "What do i Offer",
    subServices: [
      "Custom Design & Animation",
      "E-commerce Solutions",
      "CMS Configuration & Content Structuring",
      "SEO Best Practices & Site Optimization",
      "Ongoing Support & Maintenance",
    ],
    resultsTitle: "Outcome for You",
    results:
      "Visually stunning, highly functional websites that you can easily manage and update, designed to captivate and convert your target audience.",
    ctaLink: "webflow-development",
    ctaText: "Chart your course",
    ctaInfo: "to my pricing and service blueprints.",
  },
  {
    slug: 'shopify-development',
    name: "Shopify Development",
    tagline: "Elevate Your E-commerce Experience with Shopify",
    description:
      "Maximize your online store's potential with our Shopify development services. From custom theme designs to advanced feature integrations, we ensure your Shopify site is not just another store but a powerful, user-friendly e-commerce platform that stands out in the digital marketplace.",
    img: "/images/services/shopify-dev.webp",
    subServicesTitle: "What do i Offer",
    subServices: [
      "Store Setup & Customization",
      "Theme Design & Development",
      "App Integration & Custom Features",
      "Migration Services & SEO Optimization",
      "Ongoing Support & Performance Tuning",
    ],
    resultsTitle: "Outcome for You",
    results:
      "A seamless, scalable, and secure online shopping experience that drives sales and delights customers at every touchpoint.",
    ctaLink: "shopify-development",
    ctaText: "Embark with me",
    ctaInfo: "to discover pricing and explore uncharted possibilities.",
  },
  {
    slug: 'seo-optimization',
    name: "SEO Optimization",
    tagline: "Boost Your Visibility and Outrank Your Competitors",
    description:
      "In the digital age, visibility is key to success. Our comprehensive SEO optimization packages are designed to increase your website's rankings, attract more traffic, and convert visitors into loyal customers. We use data-driven strategies and white-hat SEO techniques to improve your online presence and keep you ahead of the competition.",
    img: "/images/services/seo-opt.webp",
    subServicesTitle: "What do i Offer",
    subServices: [
      "Keyword Research & Strategy",
      "On-Page Optimization & Content Strategy",
      "Technical SEO & Site Audits",
      "Link Building & Authority Enhancement",
      "Performance Monitoring & Reporting",
    ],
    resultsTitle: "Outcome for You",
    results:
      "Improved search engine rankings, increased organic traffic, and higher conversion rates, leading to significant growth in your online presence.",
    ctaLink: "seo-optimization",
    ctaText: "Begin your journey",
    ctaInfo: "to peak performance with pricing guide.",
  },
  {
    slug: 'speed-optimization',
    name: "Performance Optimization",
    tagline: "Maximize Speed, Efficiency, and Conversion",
    description:
      "Slow load times and poor website performance can drastically affect your user experience and conversion rates. Our performance optimization services focus on enhancing your site's speed, responsiveness, and overall efficiency, ensuring visitors stay engaged and convert.",
    img: "/images/services/speed-opt.webp",
    subServicesTitle: "What do i Offer",
    subServices: [
      "Comprehensive Performance Audits",
      "Image and Asset Optimization",
      "Code Minification and Optimization",
      "CDN Implementation & Caching Strategies",
      "Mobile Optimization & Responsive Design",
    ],
    resultsTitle: "Outcome for You",
    results:
      " A lightning-fast website that retains users, improves engagement, and boosts conversions, setting you apart from the competition.",
    ctaLink: "speed-optimization",
    ctaText: "Accelerate your journey",
    ctaInfo: "with my performance optimization pricing and insights.",
  },
];
