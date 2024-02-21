import { FaShopify, FaWordpressSimple } from "react-icons/fa";
import { MdCode, MdDesignServices, MdOutlineSpeed } from "react-icons/md";

import { IconType } from "react-icons";
import { IoPulseOutline } from "react-icons/io5";
import { TbBrandWebflow } from "react-icons/tb";

interface ServicesCategoriesProps {
  name: string;
  slug: string;
  icon?: IconType;
}
const servicesCategories: ServicesCategoriesProps[] = [
  {
    name: "ui/ux design",
    slug: "uiux-design",
    icon: MdDesignServices,
  },
  {
    name: "frontend development",
    slug: "frontend-development",
    icon: MdCode,
  },
  {
    name: "wordpress development",
    slug: "wordpress-development",
    icon: FaWordpressSimple
  },
  {
    name: "shopify development",
    slug: "shopify-development",
    icon: FaShopify
  },
  {
    name: "webflow development",
    slug: "webflow-development",
    icon: TbBrandWebflow
  },
  {
    name: "speed optimization",
    slug: "speed-optimization",
    icon: MdOutlineSpeed
  },
  {
    name: "seo optimization",
    slug: "seo-optimization",
    icon: IoPulseOutline
  },
];

export default servicesCategories;
