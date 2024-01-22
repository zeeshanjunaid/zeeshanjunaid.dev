import * as React from "react";

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
  <div>
    <h1>Welcome, {name}!</h1>
  </div>
);
