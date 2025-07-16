import { BsWhatsapp } from "react-icons/bs";
import { Mail, Phone, PhoneCall } from "lucide-react";

import ContactForm from "../components/contact-form";
import { Container } from "@/components/container";
import CustomLink from "@/components/custom-link";
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
              <CustomLink
                text="hello[at]zeeshanjunaid[dot]dev"
                link="mailto:hello@zeeshanjunaid.dev"
                className="text-[16px] md:text-[18px] lg:text-5 font-switzer text-dark dark:text-light"
              />
            </div>
            <div className="flex items-center justify-start gap-x-1.5">
              <Phone size={18} />
              <CustomLink
                text="+923408563525"
                link="tel:+923408563525"
                className="text-[16px] md:text-[18px] lg:text-5 font-switzer text-dark dark:text-light"
              />
            </div>
            <div className="flex items-center justify-start gap-x-1.5">
              <BsWhatsapp size={18} />
              <CustomLink
                text="+923408563525"
                link="whatsapp://send?phone=923408563525"
                className="text-[16px] md:text-[18px] lg:text-5 font-switzer text-dark dark:text-light"
              />
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
