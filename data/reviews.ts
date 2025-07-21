export interface Review {
  client: string;
  headline?: string;
  logo?: string;
  company?: string;
  profile: string;
  review: string;
  featured?: boolean;
  country?: {
    code: string;
    name: string;
  };
}
interface VideoReview {
  client: string;
  video: string;
  profile?: string;
  country?: {
    code: string;
    name: string;
  };
}
export const VideoReviewsList: VideoReview[] = [
  {
    client: "Felicia Lucco",
    video: "https://youtu.be/vWWplNROVkI",
    profile: "/images/testimonials/felicia.webp",
    country: {
      code: "ca",
      name: "Canada",
    },
  },
  {
    client: "David Kalisman",
    video: "https://youtu.be/WvE1OrrY7xk",
    country: {
      code: "us",
      name: "United States",
    },
  },
  {
    client: "Sebastian Zeb",
    video: "https://youtu.be/Qc3foD2QR9k",
    profile: "/images/testimonials/seb.png",
    country: {
      code: "gb",
      name: "United Kingdom",
    },
  },
  {
    client: "Shann Lim",
    video: "https://youtu.be/TAaeI-7R5Ys",
    profile: "/images/testimonials/shann.jpeg",
    country: {
      code: "id",
      name: "Indonesia",
    },
  },
  {
    client: "Anthony Chicabu",
    video: "https://youtu.be/vVjoBGQ0o7c",
    profile: "/images/testimonials/anthony.jpeg",
    country: {
      code: "ng",
      name: "Nigeria",
    },
  },
];
const ReviewsList: Review[] = [
  {
    client: "Arthur Carrion",
    headline: "My go-to developer and designer with very high attention to details",
    profile: "/images/testimonials/arthur.jpeg",
    company: "BluHorn Media",
    logo: "/images/testimonials/bluhorn.png",
    review:
      "I hired Zeeshan for multiple projects. He is my go to developer and designer right now. I highly recommend working with him. He is very responsive when it comes to communicating. He has done all my tasks in a timely manner with very high attention to details. If you are looking for an all around developer Zeeshan is your guy!",
    country: {
      code: "us",
      name: "United States",
    },
  },
  {
    client: "Josh Peters",
    headline: "Outstanding attention to detail, timely communication, and professionalism",
    logo: "/images/testimonials/pp.png",
    company: "Passage Protocol",
    profile: "/images/testimonials/josh-pic.jpg",
    review:
      "Worked with Zeeshan for a project in React, Next.js 13, and Tailwind to build a frontend. His attention to detail, timely communication, and professionalism were outstanding. I recommend his services to anyone seeking top-notch frontend development.",
    featured: true,
    country: {
      code: "us",
      name: "United States",
    },
  },
  {
    client: "Liane Schild",
    headline: "Extremely skilled in many areas - you will not be disappointed!",
    profile: "/images/testimonials/liane-pic.jpeg",
    review:
      "I hired Zeeshan to do two web projects - one full web design from scratch - and was extremely pleased with his work. Zeeshan is very skilled in many areas of development. Highly recommend him - you will not be dissapointed!",
    featured: true,
    country: {
      code: "ca",
      name: "Canada",
    },
  },
  {
    client: "Mac Cassity",
    headline: "Excellent provider with extreme attention to detail and knowledge",
    profile: "/images/testimonials/mac.jpeg",
    review:
      "Excellent provider...attention to detail, extremely knowledgeable and a pleasure to work with. HIGHLY recommended!",
    country: {
      code: "us",
      name: "United States",
    },
  },
  {
    client: "Chad Yesilova",
    headline: "Over-delivered from the get go! Incredible communicator",
    profile: "/images/testimonials/chad.jpeg",
    logo: "/images/testimonials/bs.jpeg",
    company: "Blue Studies",
    review:
      "Zeeshan over-delivered from the get go! Incredible communicator, understood the requirements, made immediate changes based on feedback and delivered above expectations. I will definitely use again.",
    country: {
      code: "mx",
      name: "Maxico",
    },
  },
  {
    client: "Veronica Runyon",
    headline: "Quick, efficient and accurate - went over and above",
    profile: "/images/testimonials/veronica.jpg",
    review:
      "The service was exactly what I needed. Very quick, efficient and accurate. He went over and above to deliver on what I needed",
    country: {
      code: "ca",
      name: "Canada",
    },
  },
  {
    client: "Natalie Soto-Wright",
    headline: "A pleasure to work with - would recommend for frontend development",
    profile: "/images/testimonials/natalie.png",
    review:
      "Zeeshan is a pleasure to work with. We appreciated his work and would recommend for anyone looking for a front end developer!",
    country: {
      code: "us",
      name: "United States",
    },
  },
  {
    client: "Matheo Masschelein",
    headline: "Always perfect work - problems resolved within 48 hours",
    profile: "/images/testimonials/matheo.webp",
    review:
      "That's a many time I have work with Zeeshan and that's always perfect, all my problems are resolved within 48 hours and he explain me really well all the things to do to don't have the same error on the future. He is one of the best freelancer wich I have work, professionnal and efficient.",
    country: {
      code: "fr",
      name: "France",
    },
  },
  {
    client: "Amanda Clarke",
    headline: "Professional and efficient - one of the best freelancers",
    logo: "/images/testimonials/allegra.png",
    company: "Allegra Dawn",
    profile: "/images/testimonials/amanda.jpg",
    review:
      "That's a many time I have work with Zeeshan and that's always perfect, all my problems are resolved within 48 hours and he explain me really well all the things to do to don't have the same error on the future. He is one of the best freelancer wich I have work, professionnal and efficient.",
    featured: true,
    country: {
      code: "ca",
      name: "Canada",
    },
  },
  {
    client: "Suliman Hassan",
    headline: "Talented React Developer - great guy to work with",
    profile: "/images/testimonials/allegra.png",
    review:
      "If you are looking for a talented React Developer, I would recommend considering this freelancer for your project.Great guy to work with. I will consider him for future projects",
    country: {
      code: "sa",
      name: "Saudi Arabia",
    },
  },
];

export default ReviewsList;
