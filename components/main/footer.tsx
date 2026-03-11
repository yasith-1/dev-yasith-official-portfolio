"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FOOTER_DATA, SOCIALS } from "@/constants";
import {
  ChevronUpIcon,
  MapPinIcon,
  EnvelopeIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

export const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Update time for the personal touch
  useEffect(() => {
    const updateTime = () => {
      const time = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Colombo", // Assuming Sri Lanka based on previous context
      });
      setCurrentTime(time);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Back to top visibility
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full relative z-[30] overflow-hidden pt-32 pb-10 bg-[#030014]">
      {/* Top Border Gradient */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      {/* Background Decorative Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -right-24 w-96 h-96 bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">

          {/* Brand & Connect Section */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                Let&apos;s build <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">something iconic</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                Always open to collaborating on innovative projects and discussing new opportunities in software engineering.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="mailto:yashith.wd@gmail.com"
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all duration-300 flex items-center gap-2 group"
                >
                  <EnvelopeIcon className="h-5 w-5" />
                  Get In Touch
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    🚀
                  </motion.span>
                </Link>
              </div>
            </motion.div>

            {/* Location & Time Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                  <MapPinIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Location</p>
                  <p className="text-white text-sm">Sri Lanka (LKA)</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                  <ClockIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Local Time</p>
                  <p className="text-white text-sm">{currentTime}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
              {FOOTER_DATA.map((column, idx) => (
                <motion.div
                  key={column.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col space-y-6"
                >
                  <h3 className="text-white font-bold text-sm uppercase tracking-[0.2em]">
                    {column.title}
                  </h3>
                  <div className="flex flex-col space-y-4">
                    {column.data.map(({ icon: Icon, name, link }) => (
                      <Link
                        key={`${column.title}-${name}`}
                        href={link}
                        target={link.startsWith('http') ? "_blank" : "_self"}
                        rel={link.startsWith('http') ? "noreferrer noopener" : ""}
                        className="group flex items-center text-gray-400 hover:text-white transition-all duration-300"
                      >
                        {Icon && (
                          <span className="mr-3 scale-90 group-hover:scale-110 group-hover:text-purple-400 transition-all">
                            <Icon />
                          </span>
                        )}
                        <span className="text-[15px] font-medium tracking-wide">{name}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-16" />

        {/* Tech Stack Bar */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 mb-16 opacity-40 hover:opacity-100 transition-opacity duration-500">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-500">Tech Stack</span>
          {["React", "Next.js 14", "TypeScript", "Tailwind CSS", "Spring Boot", "Docker", "AWS"].map((tech) => (
            <span key={tech} className="text-xs text-white font-medium">{tech}</span>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-gray-500 text-sm font-medium">
              &copy; {new Date().getFullYear()} Yashith Prabhashwara. Crafted with 💜 and <span className="text-cyan-500">Next.js</span>
            </p>
          </div>

          {/* Social Links Small */}
          <div className="flex items-center gap-6">
            {SOCIALS.map(({ link, name, icon: Icon }) => (
              <a
                key={name}
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                className="text-gray-500 hover:text-white transition-colors p-2 rounded-xl bg-white/0 hover:bg-white/5 border border-transparent hover:border-white/10"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* Site Status Mockup */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-tighter font-bold text-green-500">Live & Stable</span>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-[100] p-4 rounded-2xl bg-[#030014] border border-white/10 text-white shadow-2xl hover:border-purple-500/50 hover:shadow-purple-500/20 transition-all backdrop-blur-xl group"
          >
            <ChevronUpIcon className="h-6 w-6 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};
