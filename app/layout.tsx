import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import type { Metadata } from "next";
import ReachOut from "@/components/reach-out";
import SmoothScroll from "@/components/smooth-scroll";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Zeeshan Junaid",
  description: "Portfolio website of Zeeshan Junaid",
};

const switzer = localFont({
  src: [
    {
      path: "../public/fonts/Switzer-Bold.ttf",
      weight: "700",
    },
    {
      path: "../public/fonts/Switzer-Medium.ttf",
      weight: "500",
    },
    {
      path: "../public/fonts/Switzer-Light.ttf",
      weight: "300",
    },
  ],
  variable: "--font-switzer",
});

const antiqueOlive = localFont({
  src: [
    {
      path: "../public/fonts/Antique-Olive-Regular.ttf",
      weight: "400",
    },
    {
      path: "../public/fonts/AQBL.ttf",
      weight: "700",
    },
  ],
  variable: "--font-ao",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-light dark:bg-dark font-switzer",
          antiqueOlive.variable,
          switzer.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {/* <SmoothScroll>{children}</SmoothScroll> */}
          <main className="pt-[100px]">{children}</main>
          <ReachOut />
          <Footer />
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
