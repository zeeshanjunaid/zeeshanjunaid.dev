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
  <table
    style={{
      fontFamily: "Arial, sans-serif",
      borderCollapse: "collapse",
      width: "100%",
    }}
  >
    <tr>
      <td
        style={{
          border: "1px solid #dddddd",
          textAlign: "left",
          padding: "8px",
        }}
      >
        Name:
      </td>
      <td
        style={{
          border: "1px solid #dddddd",
          textAlign: "left",
          padding: "8px",
        }}
      >
        {name}
      </td>
    </tr>
    <tr>
      <td
        style={{
          border: "1px solid #dddddd",
          textAlign: "left",
          padding: "8px",
        }}
      >
        Email:
      </td>
      <td
        style={{
          border: "1px solid #dddddd",
          textAlign: "left",
          padding: "8px",
        }}
      >
        <a href={`mailto:${email}`}>{email}</a>
      </td>
    </tr>

    <tr>
      <td
        style={{
          border: "1px solid #dddddd",
          textAlign: "left",
          padding: "8px",
        }}
      >
        Phone:
      </td>
      <td
        style={{
          border: "1px solid #dddddd",
          textAlign: "left",
          padding: "8px",
        }}
      >
        <a href={`tel:${phone}`}>{phone}</a>
      </td>
    </tr>
    <tr>
      <td
        style={{
          border: "1px solid #dddddd",
          textAlign: "left",
          padding: "8px",
        }}
      >
        Referral:
      </td>
      <td
        style={{
          border: "1px solid #dddddd",
          textAlign: "left",
          padding: "8px",
        }}
      >
        {referral}
      </td>
    </tr>
    <tr>
      <td
        style={{
          border: "1px solid #dddddd",
          textAlign: "left",
          padding: "8px",
        }}
      >
        Message:
      </td>
      <td
        style={{
          border: "1px solid #dddddd",
          textAlign: "left",
          padding: "8px",
        }}
      >
        {message}
      </td>
    </tr>
  </table>
);
