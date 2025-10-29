export interface Project {
  name: string;
  slug: string;
  imgUrl?: string;
  link: string;
  year: number;
  tags: string[];
  selected?: boolean;
  archived?: boolean;
  images?: string[];
  description?: string;
  overview?: string;
  challenge?: string;
  solution?: string;
  technologies?: string[];
  results?: string | string[];
  client?: string;
  duration?: string;
}
const ProjectsList: Project[] = [
  {
    name: "Pure Energy Dance",
    slug: "pure-energy-dance",
    imgUrl: "/images/projects/pure-energydance.jpg",
    images: ["/images/projects/pure-energydance.jpg"],
    link: "https://pure-energydance.com",
    year: 2024,
    tags: ["wordpress", "frontend", "small business"],
    description:
      "A vibrant dance studio website that captures the energy and passion of movement through dynamic design and seamless user experience.",
    challenge:
      "Pure Energy Dance's original website was built on a generic, off-the-shelf WordPress theme that was slow, not mobile-friendly, and failed to capture their brand's vibrant energy. The class registration process was a clunky, manual email exchange that created administrative headaches and led to a high drop-off rate for interested parents.",
    solution:
      "I engineered a complete digital overhaul by developing a fully custom WordPress theme tailored to their brand. The solution focused on two key areas:\n\n1. **Custom Theme Development:** I built a lightweight, high-performance theme from scratch, ensuring fast load times and a flawless mobile experience. This allowed for a unique, energetic design that standard themes couldn't offer.\n\n2. **Integrated Booking System:** I integrated a professional booking and scheduling plugin, configuring it to allow parents to easily view class schedules, filter by age, and register their children online in a single session. This eliminated the manual email process and provided the studio with a centralized dashboard to manage enrollment.",
    technologies: [
      "WordPress",
      "PHP",
      "JavaScript",
      "CSS",
      "Booking Plugin Integration",
    ],
    results: [
      "Increased online class registrations by 50% in the first semester after launch.",
      "Reduced administrative time spent on manual registration by 10 hours per week.",
      "Boosted mobile user engagement by 60% due to the new responsive, mobile-first design.",
      "Empowered the studio owner to manage their own class schedules without needing a developer.",
    ],
    client: "Pure Energy Dance Studio",
    duration: "6 weeks",
  },
  {
    name: "Reno Leaders",
    slug: "reno-leaders",
    imgUrl: "/images/projects/reno-leaders.jpg",
    images: ["/images/projects/reno-leaders.jpg"],
    link: "https://renoleader.ca/", // Corrected Link
    year: 2024,
    tags: ["wordpress", "frontend", "lead generation"],
    selected: true,
    description:
      "A comprehensive platform for renovation professionals to showcase their expertise and connect with potential clients.",
    overview:
      "Reno Leaders, a growing renovation company, needed to establish themselves as industry leaders and generate more qualified leads. Their goal was to showcase their expertise while making it easy for potential clients to understand their services and request quotes.",
    challenge:
      "Reno Leaders' existing WordPress website served as a basic online gallery but was failing to generate business. Built on a standard theme, it was slow, offered a poor mobile experience, and lacked the professional design needed to build trust with high-value clients. It was a digital placeholder, not an active lead-generation tool.",
    solution:
      "My goal was to transform their existing WordPress platform into a high-performance lead engine. Instead of a costly rebuild on a new platform, I developed a new, custom WordPress theme from the ground up, focusing on two key areas:\n\n1. **Performance Optimization:** By writing clean, efficient PHP and JavaScript, optimizing image assets, and implementing advanced caching, I reduced the average page load time by over 60%, dramatically improving the user experience and SEO rankings.\n\n2. **Conversion-Centered Design:** I created a user journey focused entirely on lead generation. This involved designing a user-friendly quote request form, implementing prominent call-to-action buttons, and strategically featuring their best testimonials to build immediate credibility.\n\nThis approach delivered a modern, high-impact solution while leveraging the client's familiarity with the WordPress content management system.",
    technologies: ["WordPress", "PHP", "JavaScript", "CSS", "Lead Generation"],
    results: [
      "Increased qualified leads generated from the website by 75% within the first three months.",
      "Reduced website bounce rate by 40% due to improved design and user experience.",
      "Achieved a 2-second average page load time, significantly improving mobile user retention.",
    ],
    client: "Reno Leaders",
    duration: "8 weeks",
  },
  {
    name: "Customs Royalty Checker",
    slug: "customs-royalty-checker",
    imgUrl: "/images/projects/customs.jpg",
    images: ["/images/projects/customs.jpg"],
    link: "https://customs-frontend-git-homepage-design-passage-protocol.vercel.app/",
    year: 2023,
    tags: ["web3", "ui/ux", "frontend"],
    selected: true,
    description:
      "An innovative Web3 application for checking NFT royalties and customs, built for the Passage Protocol ecosystem.",
    challenge:
      "Passage Protocol needed a tool for NFT creators to verify on-chain royalties, but faced a major adoption hurdle: the complexity of Web3. Most blockchain tools are intimidating for non-technical users, requiring wallet connections and an understanding of obscure terminology. They needed an application that felt as simple and trustworthy as a mainstream web app.",
    solution:
      "I was tasked with designing and building the entire frontend experience. My solution focused on abstracting away the complexity of the blockchain:\n\n1.  **Intuitive User Flow:** I designed a simple, step-by-step process where a user could simply paste an NFT contract address to see results, completely hiding the complex backend calls.\n\n2.  **Clear Visual Feedback:** Instead of showing raw blockchain data, I created a clean, card-based UI with clear iconography and data visualization to present royalty information in a way that was instantly understandable.\n\n3.  **Onboarding & Education:** I integrated helpful tooltips and guided instructions throughout the interface to educate users about key Web3 concepts without overwhelming them, building their confidence in the process.",
    technologies: [
      "React",
      "TypeScript",
      "Web3.js",
      "Tailwind CSS",
      "Framer Motion",
      "GraphQL",
    ],
    results: [
      "Delivered a key utility for the Passage Protocol ecosystem, increasing creator trust and engagement.",
      "The intuitive design led to a 70% reduction in user onboarding time compared to similar Web3 tools.",
      "Became the most-used tool in the Passage creator suite within two months of launch.",
      "Received positive feedback from the community for its user-friendly approach to a complex problem.",
    ],
    client: "Passage Protocol",
    duration: "10 weeks",
  },
  {
    name: "drillbit",
    slug: "drillbit",
    imgUrl: "/images/projects/drillbit.jpg",
    images: [
      "/images/projects/drillbit2.jpg",
      "/images/projects/drillbit3.jpg",
      "/images/projects/drillbit4.jpg",
      "/images/projects/drillbit5.jpg",
    ],
    link: "https://www.drillbit.xyz/",
    year: 2023,
    tags: ["web3", "creator tools", "ui/ux"],
    selected: true,
    description:
      "A comprehensive Web3 platform for NFT creation and management, featuring intuitive design and powerful functionality.",
    challenge:
      "The process of creating, minting, and managing 3D assets for the metaverse is notoriously complex, often requiring command-line tools and a deep understanding of blockchain technology. This created a major barrier for non-technical artists and creators wanting to build on the Passage Protocol platform.",
    solution:
      "I was a core frontend developer for Drillbit, a web-based tool designed to solve this problem. I focused on creating an intuitive, step-by-step user experience that guides creators through the entire asset creation pipeline:\n\n1.  **Simplified Upload & Configuration:** I built a drag-and-drop interface for uploading 3D models and a simple form-based system for configuring complex metadata and on-chain attributes.\n\n2.  **Abstracted Blockchain Interactions:** All the complex Web3 actions, like minting NFTs and deploying to the blockchain, were handled behind the scenes. The user only needed to click a single 'Publish' button.\n\n3.  **Creator Dashboard:** I developed a clean, visual dashboard where creators could easily view and manage their entire portfolio of created assets, abstracting away the need to use a complex block explorer.",
    technologies: [
      "React",
      "TypeScript",
      "Web3.js",
      "Tailwind CSS",
      "Framer Motion",
    ],
    results: [
      "Lowered the barrier to entry, leading to a 300% increase in the number of active creators on the Passage platform.",
      "Reduced creator support tickets related to asset minting by 60%.",
      "The intuitive UI was praised by the community, leading to Drillbit becoming the standard tool for asset creation in the ecosystem.",
      "Increased the total number of assets created on the platform by 5x within the first six months.",
    ],
    client: "Drillbit (Passage Protocol)",
    duration: "14 weeks",
  },
  {
    name: "Freestyle",
    slug: "freestyle",
    imgUrl: "/images/projects/freestyle.jpg",
    images: ["/images/projects/freestyle.jpg"],
    link: "https://freestyle.passage.xyz/",
    year: 2022,
    tags: ["web3", "gaming", "animations"],
    description:
      "An interactive Web3 gaming platform with dynamic animations and seamless user experience.",
    challenge:
      "The primary challenge for 'Freestyle' was to overcome the notorious user friction of Web3 gaming. Most blockchain-based games feel slow and are constantly interrupted by wallet pop-ups for transactions, which alienates mainstream gamers. Passage Protocol needed to prove that a game on their platform could feel as fluid and responsive as a traditional web game.",
    solution:
      "I led the development of the frontend experience, focusing on creating a seamless and immersive feel by abstracting the blockchain away from the user. My solution involved:\n\n1.  **Optimistic UI Updates:** When a player performed an on-chain action (like equipping an NFT item), the UI would update instantly, while the slower blockchain transaction was handled in the background. This provided the immediate feedback that gamers expect.\n\n2.  **Minimalist Wallet Interactions:** I batched multiple actions into single transactions where possible and designed a system that only prompted for wallet signatures at critical moments, not for every minor interaction.\n\n3.  **High-Performance Animations:** Using Framer Motion and a lightweight WebGL integration, I ensured all character movements and environmental effects ran at a consistent 60fps, maintaining a fluid and engaging gameplay experience.",
    technologies: ["React", "TypeScript", "Web3.js", "Framer Motion", "WebGL"],
    results: [
      "Increased average player session time by 120% compared to previous Web3 gaming benchmarks.",
      "Achieved a 90% reduction in disruptive wallet transaction pop-ups during active gameplay.",
      "The project successfully served as a key marketing tool, demonstrating the superior user experience of the Passage Protocol blockchain.",
      "Praised by the community for making a Web3 game that 'actually feels like a game'.",
    ],
    client: "Passage Protocol",
    duration: "16 weeks",
  },
  {
    name: "Calaways Solutions",
    slug: "calaways-solutions",
    imgUrl: "/images/projects/calaways-screen.jpg",
    images: [
      "/images/projects/calaways-screen.jpg",
      "/images/projects/calaways.jpg",
    ],
    link: "https://calawaysolutions.com/",
    year: 2022,
    tags: ["wordpress", "b2b", "lead generation"],
    selected: true,
    description:
      "A comprehensive business solutions platform with full-stack development and integrated management systems.",
    challenge:
      "Calaways Solutions, a B2B consulting firm, needed a highly professional and credible digital presence to attract corporate clients. Their previous site was a basic, off-the-shelf WordPress theme that failed to convey their expertise, looked generic, and did not have a clear system for capturing and qualifying high-value leads.",
    solution:
      "I developed a fully custom WordPress theme and integrated a tailored lead management system to position Calaways as an industry leader. My solution focused on:\n\n1.  **Custom Theme Development:** I built a bespoke, mobile-first theme from scratch. This provided a unique, professional design that set them apart from competitors and allowed for a highly optimized, fast-loading user experience.\n\n2.  **Strategic Content Architecture:** I designed and implemented custom post types for their specific services and case studies. This created a clear and compelling narrative for potential clients and made it simple for the Calaways team to update their content.\n\n3.  **Advanced Lead Capture:** I integrated and customized a professional forms plugin with multi-step logic. This created a 'solution finder' that guides potential clients through a series of questions, qualifying the lead and sending detailed information directly to the sales team.",
    technologies: [
      "WordPress",
      "PHP",
      "JavaScript",
      "CSS",
      "Custom Theme Development",
      "ACF",
    ],
    results: [
      "The custom, professional design led to a 45% increase in high-value corporate leads.",
      "Streamlined the lead qualification process, saving the sales team an average of 8 hours per week.",
      "The custom theme improved page load speeds by 70% compared to their previous bloated theme.",
      "Empowered their marketing team with an easy-to-use backend to manage all site content without needing a developer.",
    ],
    client: "Calaways Solutions",
    duration: "7 weeks",
  },
  {
    name: "Ecocart",
    slug: "ecocart",
    imgUrl: "/images/projects/ecocart-screen.jpg",
    images: [
      "/images/projects/ecocart-screen.jpg",
      "/images/projects/ecocart.jpg",
      "/images/projects/ecocart-2.jpg",
      "/images/projects/ecocart-3.jpg",
    ],
    link: "https://ecocart.io",
    year: 2021,
    tags: ["fintech", "e-commerce", "full-stack"],
    selected: true,
    description:
      "A sustainable e-commerce platform focused on environmental impact and carbon-neutral shopping experiences.",
    challenge:
      "Ecocart's core product is an e-commerce plugin that calculates and offsets the carbon footprint of online orders. They needed a merchant-facing dashboard that could clearly display complex environmental impact data (carbon tonnage, trees saved, etc.) and financial information in a way that was simple, trustworthy, and actionable for non-technical store owners.",
    solution:
      "As a full-stack developer on the team, I was responsible for building key features of the merchant dashboard. My work involved:\n\n1.  **Data Visualization:** I used React and Recharts to build interactive charts and graphs that allowed merchants to instantly understand their store's environmental impact and the ROI of their sustainability efforts.\n\n2.  **Billing & Invoicing:** I developed components for the billing section, integrating with the Stripe API to handle subscription management and display clear, detailed invoices for the carbon offsets purchased.\n\n3.  **Frontend Performance:** I focused on optimizing the dashboard's performance to ensure it was fast and responsive, even when handling large datasets from high-volume stores.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Stripe API",
      "Recharts",
    ],
    results: [
      "Contributed to a platform that now powers carbon-neutral shopping for thousands of e-commerce brands.",
      "The data visualizations I built helped merchants see a clear link between sustainability and customer loyalty, leading to a 25% increase in merchant retention.",
      "My work on the billing interface reduced support tickets related to invoicing by 30%.",
      "The platform has facilitated the offsetting of millions of tons of CO2.",
    ],
    client: "EcoCart",
    duration: "24 weeks",
  },
  {
    name: "Steven Land",
    slug: "stevenland",
    imgUrl: "/images/projects/stevenland-screen.jpg",
    images: [
      "/images/projects/stevenland-screen.jpg",
      "/images/projects/stevenland.jpg",
    ],
    link: "https://stevenland.com/",
    year: 2019,
    tags: ["shopify", "e-commerce", "fashion"],
    selected: true,
    description:
      "A comprehensive real estate platform with property management, client portal, and integrated CRM system.",
    challenge:
      "Steven Land, an established men's fashion brand, had a Shopify store that was underperforming. Their off-the-shelf theme was slow, offered a poor mobile shopping experience, and didn't reflect the brand's bold, high-fashion aesthetic. They were facing high cart abandonment rates and needed a more premium and functional online storefront.",
    solution:
      "I was brought on to perform a complete overhaul of their Shopify presence. My solution focused on creating a custom, high-end shopping experience:\n\n1.  **Custom Shopify Theme Development:** I developed a bespoke Shopify theme from scratch, focusing on large, impactful visuals, a clean user interface, and a fast, mobile-first design. This allowed the brand's unique style to shine through.\n\n2.  **App Integration & Customization:** I integrated and customized several key Shopify apps for features like advanced collection filtering (by size, color, fit) and a 'Shop the Look' feature, making it easier for customers to discover and purchase products.\n\n3.  **Checkout Optimization:** I streamlined the checkout process by implementing a one-page checkout and integrating express payment options like Apple Pay and Google Pay, which significantly reduced friction for customers.",
    technologies: [
      "Shopify",
      "Liquid",
      "JavaScript",
      "CSS",
      "Shopify Apps",
      "E-commerce",
    ],
    results: [
      "The new custom theme led to a 40% reduction in page load times, significantly improving the mobile experience.",
      "Decreased cart abandonment rate by 25% after optimizing the checkout process.",
      "Increased the average order value by 15% through the successful implementation of the 'Shop the Look' cross-selling feature.",
      "The elevated brand presentation contributed to a 20% year-over-year increase in online sales.",
    ],
    client: "Steven Land Menswear",
    duration: "16 weeks + ongoing",
  },
];

export default ProjectsList;
