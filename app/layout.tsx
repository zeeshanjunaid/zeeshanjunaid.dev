import "./globals.css";

import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from "@vercel/analytics/react";
import BackToTop from "@/components/back-to-top";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import ReachOut from "@/components/reach-out";
// import SmoothScroll from "@/components/smooth-scroll";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";

export const metadata: Metadata = {
  metadataBase: new URL("https://zeeshanjunaid.dev"),
  title: {
    default: "Zeeshan Junaid - UI/UX Designer and Frontend Developer",
    template: "%s | ZJ Portfolio",
  },
  description:
    "Experienced freelance UI/UX designer and frontend developer with over 8 years of expertise in creating engaging digital experiences, innovative design solutions and seamless user interfaces.",
  icons: {
    icon: "/favicons/favicon.ico",
    shortcut: "/favicons/favicon-16x16.png",
    apple: "/favicons/apple-touch-icon.png",
  },
  openGraph: {
    title: "Zeeshan Junaid - UI/UX Designer and Frontend Developer",
    description:
      "Experienced freelance UI/UX designer and frontend developer with over 8 years of expertise in creating engaging digital experiences, innovative design solutions and seamless user interfaces.",
    url: "https://zeeshanjunaid.dev",
    siteName: "Zeeshan Junaid",
    images: "/images/opengraph-image.jpg",
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
        <ClerkProvider>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <NextTopLoader
              color="#A374FF"
              initialPosition={0.08}
              crawlSpeed={200}
              height={4}
              crawl={true}
              showSpinner={false}
              easing="ease"
              speed={250}
              shadow="0 0 16px #A374FF,0 0 8px #A374FF"
              template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
              zIndex={1600}
              showAtBottom={false}
            />

            <Header />
            <main className="pt-[100px]">
              {children}
              <ReachOut />
            </main>
            <Footer />
            <BackToTop />

            <Toaster />
          </ThemeProvider>
        </ClerkProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
