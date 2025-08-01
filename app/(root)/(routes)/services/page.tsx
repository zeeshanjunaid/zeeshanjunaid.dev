import ServicesPageClient from "../components/services-page-client";
import { ServiceSchema } from "../components/service-schema";

export const metadata = {
  title: "Services",
  alternates: {
    canonical: "/services",
  },
};

const ServicesPage = () => {
  return (
    <>
      <ServiceSchema />
      <ServicesPageClient />
    </>
  );
};

export default ServicesPage;
