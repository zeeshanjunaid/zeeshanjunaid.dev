"use client";

import {
  generateWebSiteSchema,
  generatePersonSchema,
  generateOrganizationSchema
} from '@/components/schema-markup';
import { SchemaMarkup } from '@/components/schema-markup'; // Assuming SchemaMarkup is also in this file

export function Schema() {
  return (
    <>
      <SchemaMarkup schema={generateWebSiteSchema()} />
      <SchemaMarkup schema={generatePersonSchema()} />
      <SchemaMarkup schema={generateOrganizationSchema()} />
    </>
  );
}