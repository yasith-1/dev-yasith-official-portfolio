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
import Script from "next/script";

import "./globals.css";

const StarsCanvas = dynamic(
  () => import("@/components/main/star-background").then((mod) => mod.StarsCanvas)
);

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#030014",
};

export const metadata: Metadata = siteConfig;

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="bg-[#030014] overflow-x-hidden">
      <body
        className={cn(
          "bg-transparent overflow-x-hidden antialiased",
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
        <Script id="tawk-to" strategy="afterInteractive">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/69b1812315202c1c36a80a79/1jjem0suk';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
