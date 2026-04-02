import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";

import { Footer } from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import Script from "next/script";

import "./globals.css";

const StarsCanvas = dynamic(
  () => import("@/components/main/star-background").then((mod) => mod.StarsCanvas)
);

const AIAssistant = dynamic(
  () => import("@/components/main/ai-assistant").then((mod) => mod.AIAssistant)
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
        <Footer />
        <AIAssistant />
        {/* <Script id="tawk-to" strategy="afterInteractive">
          {`
            window.Tawk_API = window.Tawk_API || {};
            window.Tawk_LoadStart = new Date();
            
            window.Tawk_API.onLoad = function() {
              window.Tawk_API.hideAttentionGrabber();
            };

            // Force hide multiple times to ensure it stays hidden
            var hideAttempts = 0;
            var hideInterval = setInterval(function() {
              if (window.Tawk_API && typeof window.Tawk_API.hideAttentionGrabber === 'function') {
                window.Tawk_API.hideAttentionGrabber();
                hideAttempts++;
              }
              if (hideAttempts > 10) clearInterval(hideInterval);
            }, 1000);

            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/69b1812315202c1c36a80a79/1jjem0suk';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script> */}
      </body>
    </html>
  );
}
