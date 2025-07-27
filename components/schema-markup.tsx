"use client";

import { ReactElement } from "react";

interface SchemaMarkupProps {
  schema: Record<string, any>;
}

export const SchemaMarkup = ({ schema }: SchemaMarkupProps): ReactElement => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2),
      }}
    />
  );
};
