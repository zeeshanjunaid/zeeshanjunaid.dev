import { EmailTemplate } from "@/components/email-template";
import { NextResponse } from "next/server";
import { ReactElement } from "react";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY || "");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, phone, referral } = body;
    const { data, error } = await resend.emails.send({
      from: name + "<hello@zeeshanjunaid.dev>",
      to: ["hello@zeeshanjunaid.dev"],
      subject: `Message from ${name}`,
      react: EmailTemplate({
        name,
        email,
        message,
        phone,
        referral,
      }) as ReactElement,
    });

    if (error) {
      return NextResponse.json({ error });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
