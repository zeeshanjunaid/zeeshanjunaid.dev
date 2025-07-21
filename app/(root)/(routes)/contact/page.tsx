import ContactPageClient from "../components/contact-client";

import PricingTable from "../components/pricing-table";
import { Container } from "@/components/container";
import { BlurBG } from "@/components/blur-bg";
import { CheckCircle, HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ContactForm from "../components/contact-form";

export const metadata = {
  title: "Start a Project",
};

const ContactPage = () => {
  const faqs = [
    {
      question: "What kind of clients do you typically work with?",
      answer: "I work with ambitious businesses of all sizes - from startups launching their first product to established companies looking to modernize their digital presence. My ideal clients value quality, understand the importance of user experience, and want a collaborative partner rather than just a service provider."
    },
    {
      question: "What is your turnaround time for a typical project?",
      answer: "Project timelines vary based on scope and complexity. A simple website typically takes 4-6 weeks, while more complex applications can take 8-16 weeks. For subscription plans, you'll see regular progress with weekly updates and monthly deliverables."
    },
    {
      question: "How does the subscription plan work?",
      answer: "Subscription plans provide ongoing value with monthly deliverables. You can pause or cancel anytime with 30 days notice. There are no long-term contracts - just consistent, high-quality work that grows with your business needs."
    },
    {
      question: "What if I only need a small, one-time task completed?",
      answer: "I'm happy to discuss one-time projects! While my subscription plans offer the best value for ongoing work, I also take on custom projects. Use the contact form below to describe your needs, and I'll provide a custom quote."
    }
  ];

  return (
    <>
      <ContactPageClient />

      {/* Pricing Section */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple/3 rounded-full blur-3xl" />
        </div>

        <Container className="px-4 md:px-7 lg:px-0">
          <div className="mb-16 text-center">
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold font-ao text-dark dark:text-light mb-6">
              How We Can Work Together
            </h2>
            <p className="text-dark/70 dark:text-light/70 font-switzer font-light text-[16px] md:text-[18px] leading-relaxed max-w-2xl mx-auto">
              Choose the package that best fits your needs, or let's discuss a custom solution for your unique project.
            </p>
          </div>

          <PricingTable />

          {/* Custom Project Option */}
          <div className="mt-16 text-center">
            <div className="relative bg-light dark:bg-dark rounded-3xl p-8 md:p-12 overflow-hidden max-w-3xl mx-auto">
              <BlurBG className="rounded-3xl" />
              <div className="relative z-20">
                <h3 className="text-[24px] md:text-[28px] font-ao font-bold text-dark dark:text-light mb-4">
                  Have a Custom Project in Mind?
                </h3>
                <p className="text-dark/80 dark:text-light/80 font-switzer font-light text-[16px] md:text-[18px] leading-relaxed mb-6">
                  If your project doesn't fit into one of the packages above, I'd still love to hear about it.
                  Fill out the form below with your project details, and I'll get back to you with a custom proposal.
                </p>
                <Link href="#contact-form">
                  <Button
                    variant="purple"
                    size="lg"
                    className="rounded-xl uppercase font-medium font-switzer flex items-center gap-2 mx-auto"
                  >
                    Discuss Custom Project
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20">
        <Container className="px-4 md:px-7 lg:px-0">
          <div className="mb-12 text-center">
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold font-ao text-dark dark:text-light mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-dark/70 dark:text-light/70 font-switzer font-light text-[16px] md:text-[18px] leading-relaxed max-w-2xl mx-auto">
              Got questions? Here are answers to the most common ones I receive from potential clients.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="relative bg-light dark:bg-dark rounded-3xl p-8 overflow-hidden">
                <BlurBG className="rounded-3xl" />
                <div className="relative z-20">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-purple/10 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
                      <HelpCircle className="w-5 h-5 text-purple" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[18px] md:text-[20px] font-ao font-bold text-dark dark:text-light mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-dark/80 dark:text-light/80 font-switzer font-light text-[16px] leading-relaxed">
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
              <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold font-ao text-dark dark:text-light mb-6">
                What Happens Next?
              </h2>
              <p className="text-dark/70 dark:text-light/70 font-switzer font-light text-[16px] md:text-[18px] leading-relaxed">
                Here's exactly what you can expect after reaching out:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple font-ao font-bold text-[24px]">1</span>
                </div>
                <h3 className="text-[18px] md:text-[20px] font-ao font-bold text-dark dark:text-light mb-3">
                  Submit the Form
                </h3>
                <p className="text-dark/80 dark:text-light/80 font-switzer font-light text-[14px] md:text-[16px] leading-relaxed">
                  Fill in your project details below with as much information as possible.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple font-ao font-bold text-[24px]">2</span>
                </div>
                <h3 className="text-[18px] md:text-[20px] font-ao font-bold text-dark dark:text-light mb-3">
                  I'll Reply within 24 Hours
                </h3>
                <p className="text-dark/80 dark:text-light/80 font-switzer font-light text-[14px] md:text-[16px] leading-relaxed">
                  I'll review your submission and reach out to schedule a free, 30-minute discovery call.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple font-ao font-bold text-[24px]">3</span>
                </div>
                <h3 className="text-[18px] md:text-[20px] font-ao font-bold text-dark dark:text-light mb-3">
                  Let's Build
                </h3>
                <p className="text-dark/80 dark:text-light/80 font-switzer font-light text-[14px] md:text-[16px] leading-relaxed">
                  If we're a good fit, we'll finalize the details and start building your success story.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 md:py-20">
        <Container className="px-4 lg:px-0">
          <ContactForm />
        </Container>
      </section>
    </>
  );
};

export default ContactPage;