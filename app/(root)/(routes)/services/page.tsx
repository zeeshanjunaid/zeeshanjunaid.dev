import React from "react";
import { SchemaMarkup, generateServiceSchema } from "@/components/schema-markup";
import { servicesCards } from "@/data/services";
import ServicesPageClient from "../components/services-page-client";

export const metadata = {
  title: "Services",
};

const ServicesPage = () => {
  return (
    <>
      {/* Services Schema Markup */}
      {servicesCards.map((service, index) => (
        <SchemaMarkup key={index} schema={generateServiceSchema(service)} />
      ))}
      <ServicesPageClient />
    </>
  );
};

export default ServicesPage;
