import { EmailTemplate } from "@/components/email-template";
import { NextRequest, NextResponse } from "next/server";
import { ReactElement } from "react";
import { Resend } from "resend";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY || "");

const emailSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  phone: z.string().optional(),
  service: z.string().optional(),
  referral: z.string().optional(),
});

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 5, // 5 requests per minute
});

export async function POST(req: NextRequest) {
  try {
    const rateLimitResult = await limiter(req);
    if (!rateLimitResult.success) {
      return new NextResponse("Too Many Requests", { status: 429 });
    }

    const body = await req.json();
    const parsedBody = emailSchema.safeParse(body);

    if (!parsedBody.success) {
      return new NextResponse("Invalid request body", { status: 400 });
    }

    const { name, email, message, phone, service, referral } = parsedBody.data;
    const { data, error } = await resend.emails.send({
      from: name + "<hello@zeeshanjunaid.dev>",
      to: ["hello@zeeshanjunaid.dev"],
      subject: `Message from ${name}`,
      react: EmailTemplate({
        name,
        email,
        message,
        phone: phone || "",
        service: service || "",
        referral: referral || "",
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
