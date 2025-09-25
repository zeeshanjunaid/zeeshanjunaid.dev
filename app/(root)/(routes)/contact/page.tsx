import ContactPageClient from "../components/contact-client";

import { SchemaMarkup } from "@/components/schema-markup";
import { Container } from "@/components/container";
import { BlurBG } from "@/components/blur-bg";
import { HelpCircle } from "lucide-react";

export const metadata = {
  title: "Start a Project",
  alternates: {
    canonical: "/contact",
  },
};

const ContactPage = () => {
  // Contact page schema
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Zeeshan Junaid - Start Your Project",
    description: "Get in touch with Zeeshan Junaid to discuss your web development project. Professional UI/UX design and frontend development services.",
    url: "https://zeeshanjunaid.dev/contact",
    mainEntity: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "hello@zeeshanjunaid.dev",
      telephone: "+92 340 8563525",
      availableLanguage: ["English"],
      serviceArea: {
        "@type": "Place",
        name: "Worldwide",
      },
    },
  };

  const faqs = [
    {
      question: "What kind of clients do you typically work with?",
      answer: "I work with ambitious businesses of all sizes - from startups launching their first product to established companies looking to modernize their digital presence. My ideal clients value quality, understand the importance of user experience, and want a collaborative partner rather than just a service provider."
    },
    {
      question: "What is your turnaround time for a typical project?",
      answer: "Project timelines vary based on scope and complexity. A simple website typically takes 4-6 weeks, while more complex applications can take 8-16 weeks. I'll provide regular progress updates throughout the development process."
    },
    {
      question: "What if I only need a small, one-time task completed?",
      answer: "I'm happy to discuss one-time projects! Use the contact form below to describe your needs, and I'll provide a custom quote for your specific requirements."
    }
  ];

  return (
    <>
      <SchemaMarkup schema={contactSchema} />
      <ContactPageClient />


      {/* FAQ Section */}
      <section className="py-16 md:py-20">
        <Container className="px-4 md:px-7 lg:px-0">
          <div className="mb-12 text-center">
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold font-ao text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-900/70 dark:text-white/70 font-switzer font-light text-[16px] md:text-[18px] leading-relaxed max-w-2xl mx-auto">
              Got questions? Here are answers to the most common ones I receive from potential clients.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="relative bg-white dark:bg-gray-900 rounded-3xl p-8 overflow-hidden">
                <BlurBG className="rounded-3xl" />
                <div className="relative z-20">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-purple/10 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
                      <HelpCircle className="w-5 h-5 text-purple" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[18px] md:text-[20px] font-ao font-bold text-gray-900 dark:text-white mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-gray-900/80 dark:text-white/80 font-switzer font-light text-[16px] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What Happens Next Section */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple/5 rounded-full blur-3xl" />
        </div>

        <Container className="px-4 md:px-7 lg:px-0">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold font-ao text-gray-900 dark:text-white mb-6">
                What Happens Next?
              </h2>
              <p className="text-gray-900/70 dark:text-white/70 font-switzer font-light text-[16px] md:text-[18px] leading-relaxed">
                Here&apos;s exactly what you can expect after reaching out:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple font-ao font-bold text-[24px]">1</span>
                </div>
                <h3 className="text-[18px] md:text-[20px] font-ao font-bold text-gray-900 dark:text-white mb-3">
                  Submit the Form
                </h3>
                <p className="text-gray-900/80 dark:text-white/80 font-switzer font-light text-[14px] md:text-[16px] leading-relaxed">
                  Fill in your project details below with as much information as possible.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple font-ao font-bold text-[24px]">2</span>
                </div>
                <h3 className="text-[18px] md:text-[20px] font-ao font-bold text-gray-900 dark:text-white mb-3">
                  I&apos;ll Reply within 24 Hours
                </h3>
                <p className="text-gray-900/80 dark:text-white/80 font-switzer font-light text-[14px] md:text-[16px] leading-relaxed">
                  I&apos;ll review your submission and reach out to schedule a free, 30-minute discovery call.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple font-ao font-bold text-[24px]">3</span>
                </div>
                <h3 className="text-[18px] md:text-[20px] font-ao font-bold text-gray-900 dark:text-white mb-3">
                  Let&apos;s Build
                </h3>
                <p className="text-gray-900/80 dark:text-white/80 font-switzer font-light text-[14px] md:text-[16px] leading-relaxed">
                  If we&apos;re a good fit, we&apos;ll finalize the details and start building your success story.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ContactPage;