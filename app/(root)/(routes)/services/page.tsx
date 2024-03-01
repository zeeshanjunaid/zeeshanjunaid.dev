import { Container } from "@/components/container";
import React from "react";
import ServiceCard from "../components/service-card";
import { servicesCards } from "@/data/services";

export const metadata = {
  title: "Services",
};
const ServicesPage = () => {
  return (
    <>
      <div className="border-b-[1px] border-b-borderDarkColor pb-12">
        <Container
          className="
          px-5 md:px-7 lg:px-0
    flex flex-col justify-between items-start
    "
        >
          <div className="flex flex-col gap-y-4 md:max-w-[60%]">
            <h2 className="leading-tight text-[28px] md:text-[36px] lg:text-[44px] font-bold font-ao text-dark dark:text-light">
              Creating a platform for your purpose
            </h2>
            <p className="font-light text-[16px] md:text-[18px] lg:text-[20px] leading-snug">
              Clients come to me at all stages of development. These are the
              foundational services i offer based on their most common needs
            </p>
          </div>
        </Container>
      </div>
      <section>
        <Container className="px-5 md:px-7 lg:px-0 flex flex-col space-y-6 py-12 gap-y-12">
          {servicesCards.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </Container>
      </section>
    </>
  );
};

export default ServicesPage;
