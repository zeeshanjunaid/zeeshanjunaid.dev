import { generateServiceSchema } from "@/lib/schema";
import { servicesCards } from "@/data/services"; // Make sure this path is correct

export function ServiceSchema() {
  return (
    <>
      {servicesCards.map((service, index) => {
        // Generate the schema object for each service
        const schema = generateServiceSchema(service);

        // Render the <script> tag directly
        return (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        );
      })}
    </>
  );
}
