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
    tagline: "Solve User Problems with Intuitive, Goal-Driven Design",
    description:
      "Great design isn't just about looking good; it's about solving problems. I partner with you to understand your users' needs and your business goals, creating interfaces that are not only beautiful but also intuitive, engaging, and designed to convert.",
    img: "/images/services/design.webp",
    subServicesTitle: "What do I Offer",
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
    tagline: "Turn Your Vision into a High-Performance Web Application",
    description:
      "Your website or application is your most important digital asset. I specialize in building fast, secure, and scalable frontends using modern technologies like React and Next.js, ensuring your users have a seamless experience that works flawlessly on every device.",
    img: "/images/services/frontend-dev.webp",
    subServicesTitle: "What do I Offer",
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
    tagline: "Transform Your Content Management into a Growth Engine",
    description:
      "WordPress powers 40% of the web, but most businesses barely scratch the surface of its potential. I create custom WordPress solutions that not only look professional but also give you complete control over your content, SEO, and user experience—without the technical headaches.",
    img: "/images/services/wp-dev.webp",
    subServicesTitle: "What do I Offer",
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
    tagline: "Launch Faster with Designer-Friendly, Code-Quality Results",
    description:
      "Webflow bridges the gap between design flexibility and development power. I leverage this platform to deliver pixel-perfect, responsive websites in half the time of traditional development, while giving you an intuitive CMS that your team will actually enjoy using.",
    img: "/images/services/webflow-dev.webp",
    subServicesTitle: "What do I Offer",
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
    tagline: "Build an E-commerce Store That Actually Converts",
    description:
      "A beautiful online store means nothing if it doesn't convert visitors into customers. I specialize in creating Shopify experiences that not only showcase your products beautifully but also guide customers smoothly from discovery to purchase, maximizing your revenue per visitor.",
    img: "/images/services/shopify-dev.webp",
    subServicesTitle: "What do I Offer",
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
    tagline: "Get Found by Customers Who Are Ready to Buy",
    description:
      "The best website in the world is useless if your ideal customers can't find it. I implement proven SEO strategies that don't just increase your rankings—they attract high-intent visitors who are actively searching for what you offer, leading to more qualified leads and sales.",
    img: "/images/services/seo-opt.webp",
    subServicesTitle: "What do I Offer",
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
    tagline: "Turn Page Speed into Profit with Lightning-Fast Performance",
    description:
      "Every second of delay costs you customers. Studies show that a 1-second delay in page load time can reduce conversions by 7%. I optimize your website's performance to ensure lightning-fast load times that keep visitors engaged and boost your bottom line.",
    img: "/images/services/speed-opt.webp",
    subServicesTitle: "What do I Offer",
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
