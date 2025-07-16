import { Container } from "@/components/container";
import PricingTable from "../components/pricing-table";
import React from "react";

export const metadata = {
  title: "Hire Me",
};

const HireMePage = () => {
  return (
    <>
      <div className="border-b-[1px] border-b-borderDarkColor pb-12">
        <Container
          className="
          px-5 md:px-7 lg:px-0
          flex flex-col justify-between items-start
          "
        >
          <div className="flex flex-col gap-y-4 md:max-w-[70%]">
            <h2 className="leading-tight text-[28px] md:text-[36px] lg:text-[44px] font-bold font-ao text-dark dark:text-light">
              Choose Your Plan
            </h2>
            <p className="font-light text-[16px] md:text-[18px] lg:text-[20px] leading-snug">
              Select the perfect subscription tier that matches your project needs. 
              From ongoing maintenance to full-scale development, I've got you covered 
              with flexible plans designed to grow with your business.
            </p>
          </div>
        </Container>
      </div>
      <section>
        <Container className="px-5 md:px-7 lg:px-0 py-12">
          <PricingTable />
        </Container>
      </section>
    </>
  );
};

export default HireMePage;