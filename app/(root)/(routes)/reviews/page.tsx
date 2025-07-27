// In: app/(root)/(routes)/reviews/page.tsx

import { generateReviewsPageSchema } from "@/lib/schema";
import ReviewsList from "@/data/reviews"; // Using the default export from your data file
import ReviewsPageClient from "../components/reviews-client";

export const metadata = {
  title: "Feedback & Reviews",
  description:
    "Read testimonials and reviews from clients who have worked with Zeeshan Junaid for web development and design projects.",
};

function ReviewsPageSchema() {
  const schema = generateReviewsPageSchema(ReviewsList);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

const ReviewsPage = () => {
  return (
    <>
      <ReviewsPageSchema />
      <ReviewsPageClient />
    </>
  );
};

export default ReviewsPage;
