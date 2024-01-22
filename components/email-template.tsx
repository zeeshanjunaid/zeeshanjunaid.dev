import * as React from "react";

import { BlurBG } from "./blur-bg";

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
  phone: string;
  referral: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  message,
  phone,
  referral,
}) => (
  <div className="bg-light dark:bg-dark rounded-3xl relative overflow-hidden p-12">
    <BlurBG className="rounded-3xl" />

    <div className="relative z-20 flex flex-col gap-y-5">
      <h2 className="text-left text-[22px] leading-tight sm:text-[28px] md:text-[36px] font-bold font-ao text-dark dark:text-light">
        Recieved a message from: {name}
      </h2>
      <p className="italic text-left text-[16px] leading-tight sm:text-[18px] md:text-[20px] font-light font-ao text-dark dark:text-light">
        {message}
      </p>
      <div className="flex flex-col gap-y-2">
        <p className="text-left text-[16px] leading-tight sm:text-[18px] md:text-[20px] font-light font-ao text-dark dark:text-light">
          Referral: {referral}
        </p>
        <p className="text-left text-[16px] leading-tight sm:text-[18px] md:text-[20px] font-light font-ao text-dark dark:text-light">
          Email:{" "}
          <a
            className="underline underline-offset-4 underline-purple"
            href="mailto:{email}"
          >
            {email}
          </a>
        </p>
        <p className="text-left text-[16px] leading-tight sm:text-[18px] md:text-[20px] font-light font-ao text-dark dark:text-light">
          Phone:
          <a
            href="tel:{phone}"
            className="underline underline-offset-4 underline-purple"
          >
            {phone}
          </a>
        </p>
      </div>
    </div>
  </div>
);
