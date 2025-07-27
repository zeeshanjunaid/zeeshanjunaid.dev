import ServicesPageClient from "../components/services-page-client";
import { ServiceSchema } from "../components/service-schema";

export const metadata = {
  title: "Services",
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
