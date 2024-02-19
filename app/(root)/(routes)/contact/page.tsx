import { Mail, Phone, PhoneCall } from "lucide-react";

import { BsWhatsapp } from "react-icons/bs";
import ContactForm from "../components/contact-form";
import { Container } from "@/components/container";
import React from "react";

export const metadata = {
  title: "Contact",
};
const ContactPage = () => {
  return (
    <>
      <div className="border-b-[1px] border-b-borderDarkColor pb-12">
        <Container
          className="
        px-4 lg:px-0     
        flex flex-col justify-between items-start
        "
        >
          <div className="flex flex-col gap-y-4 md:max-w-[70%]">
            <h2 className="text-[28px] md:text-[36px] lg:text-[44px] font-bold font-ao text-dark dark:text-light">
              Connect with Me
            </h2>
            <p className="font-light text-[16px] md:text-[18px] lg:text-[20px] leading-snug">
              Embark on a journey of collaborative excellence. Reach out to me
              today to bring your digital dreams to life. Let&apos;s build
              experiences that resonate and captivate your audience.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-5  md:gap-8 md:flex-wrap lg:justify-between md:items-center mt-6 md:mt-8">
            <div className="flex items-center justify-start gap-x-1.5">
              <Mail size={18} />
              <a
                href="mailto:hello@zeeshanjunaid.dev"
                className="text-[16px] md:text-[18px] lg:text-5 font-switzer text-dark dark:text-light underline underline-purple underline-offset-4 hover:text-dark/90 dark:hover:text-light/90 transition-color duration-200"
              >
                hello[at]zeeshanjunaid[dot]dev
              </a>
            </div>
            <div className="flex items-center justify-start gap-x-1.5">
              <Phone size={18} />
              <a
                href="tel:+447465793282"
                className="text-[16px] md:text-[18px] lg:text-5 font-switzer text-dark dark:text-light underline underline-purple underline-offset-4 hover:text-dark/90 dark:hover:text-light/90 transition-color duration-200"
              >
                +44 746 579 3282
              </a>
            </div>
            <div className="flex items-center justify-start gap-x-1.5">
              <BsWhatsapp size={18} />
              <a
                href="whatsapp://send?phone=923408563525"
                className="text-[16px] md:text-[18px] lg:text-5 font-switzer text-dark dark:text-light underline underline-purple underline-offset-4 hover:text-dark/90 dark:hover:text-light/90 transition-color duration-200"
              >
                +92 340 856 3525
              </a>
            </div>
          </div>
        </Container>
      </div>
      <section>
        <Container className="px-4 lg:px-0  pt-12">
          <ContactForm />
        </Container>
      </section>
    </>
  );
};

export default ContactPage;
