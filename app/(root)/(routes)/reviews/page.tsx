import { SchemaMarkup } from "@/components/schema-markup";
import ReviewsList from "@/data/reviews";
import ReviewsPageClient from "../components/reviews-client";

export const metadata = {
  title: "Feedback",
};

const ReviewsPage = () => {
  // Reviews page schema
  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "Client Reviews - Zeeshan Junaid",
    description: "Read testimonials and reviews from clients who have worked with Zeeshan Junaid for web development and design projects.",
    url: "https://zeeshanjunaid.dev/reviews",
    mainEntity: {
      "@type": "Person",
      name: "Zeeshan Junaid",
      review: ReviewsList.filter(review => review.featured).map(review => ({
        "@type": "Review",
        author: {
          "@type": "Person",
          name: review.client,
        },
        reviewBody: review.review,
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
      })),
    },
  };

  return (
    <>
      <SchemaMarkup schema={reviewsSchema} />
      <ReviewsPageClient />
    </>
  );
};

export default ReviewsPage;