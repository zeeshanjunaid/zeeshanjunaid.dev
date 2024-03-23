import { BsSkype, BsWhatsapp } from "react-icons/bs";
import { Content, isFilled } from "@prismicio/client";
import { Mail, Phone } from "lucide-react";
import { PrismicText, SliceComponentProps } from "@prismicio/react";

import { Container } from "@/components/container";
import CustomLink from "@/components/custom-link";

const icons = {
  Email: <Mail size={18} />,
  Phone: <Phone size={18} />,
  Whatsapp: <BsWhatsapp size={18} />,
  Skype: <BsSkype size={18} />,
};
/**
 * Props for `PageHeader`.
 */
export type PageHeaderProps = SliceComponentProps<Content.PageHeaderSlice>;

/**
 * Component for "PageHeader" Slices.
 */
const PageHeader = ({ slice }: PageHeaderProps): JSX.Element => {
  return (
    <section
      className="border-b-borderDarkColor border-b-[1px] pb-12"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Container
        className="
        flex flex-col     
        items-start justify-between gap-6 px-4 md:gap-2.5 md:px-8 lg:px-0
        "
      >
        <div className="flex flex-col gap-y-4 md:max-w-[70%]">
          {isFilled.richText(slice.primary.heading) && (
            <h2 className="font-ao text-[28px] font-bold text-dark dark:text-light md:text-[36px] lg:text-[44px]">
              <PrismicText field={slice.primary.heading} />
            </h2>
          )}
          {isFilled.richText(slice.primary.sub_heading) && (
            <p className="text-balance text-[16px] font-light leading-snug md:text-[18px] lg:text-[20px]">
              <PrismicText field={slice.primary.sub_heading} />
            </p>
          )}
        </div>
        {slice.variation === "withContactInfo" && (
          <div className="mt-6 flex flex-col gap-5  md:mt-8 md:flex-row md:flex-wrap md:items-center md:gap-8 lg:justify-between">
            {slice.items.map(({ label, link, icon }) => (
              <div
                key={label}
                className="flex items-center justify-start gap-x-1.5"
              >
                {icon && icons[icon]}
                <CustomLink
                  field={link}
                  className="lg:text-5 font-switzer text-[16px] text-dark dark:text-light md:text-[18px]"
                >
                  {label}
                </CustomLink>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default PageHeader;
