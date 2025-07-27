"use client";
import { SchemaMarkup } from "@/components/schema-markup"; // Assuming SchemaMarkup is also in this file
import {
  generateOrganizationSchema,
  generatePersonSchema,
  generateWebSiteSchema,
} from "@/lib/schema";

export function Schema() {
  return (
    <>
      <SchemaMarkup schema={generateWebSiteSchema()} />
      <SchemaMarkup schema={generatePersonSchema()} />
      <SchemaMarkup schema={generateOrganizationSchema()} />
    </>
  );
}
