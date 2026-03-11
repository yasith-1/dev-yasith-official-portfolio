import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";

import { Footer } from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";
import WhatsAppWidget from "@/components/sub/whatsapp-widget";
import { WHATSAPP_CONFIG } from "@/constants";
import dynamic from "next/dynamic";

import "./globals.css";

const StarsCanvas = dynamic(
  () => import("@/components/main/star-background").then((mod) => mod.StarsCanvas),
  { ssr: false }
);

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#030014",
};

export const metadata: Metadata = siteConfig;

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-[#030014] overflow-y-scroll overflow-x-hidden",
          inter.className
        )}
      >
        <StarsCanvas />
        <Navbar />
        {children}
        {/* <WhatsAppWidget
          phoneNumber={WHATSAPP_CONFIG.phoneNumber}
          assistantName={WHATSAPP_CONFIG.assistantName}
        /> */}
        <Footer />
      </body>
    </html>
  );
}
