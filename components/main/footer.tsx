"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FOOTER_DATA } from "@/constants";

export const Footer = () => {
  return (
    <footer className="w-full relative z-[20] overflow-hidden pt-20">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />

      <div className="max-w-[1240px] px-10 mx-auto flex flex-col items-center">
        {/* Let's Connect Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full flex flex-col items-center mb-16 space-y-4 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            Let&apos;s build something amazing together
          </h2>
          <p className="text-gray-400 text-lg max-w-xl">
            Passionate about building seamless digital experiences. Reach out and let&apos;s make your ideas happen.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="mailto:yashith.wd@gmail.com"
              className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-medium hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] transition-all duration-300"
            >
              Get In Touch
            </Link>
          </motion.div>
        </motion.div>

        {/* Footer Links Grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-10 border-t border-white/10 pt-16 pb-10">
          {FOOTER_DATA.map((column, idx) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col space-y-4"
            >
              <h3 className="text-white font-semibold text-lg uppercase tracking-wider">
                {column.title}
              </h3>
              <div className="flex flex-col space-y-3">
                {column.data.map(({ icon: Icon, name, link }) => (
                  <Link
                    key={`${column.title}-${name}`}
                    href={link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center text-gray-400 hover:text-purple-400 transition-colors duration-300"
                  >
                    {Icon && (
                      <span className="mr-3 text-lg group-hover:scale-110 transition-transform duration-300">
                        <Icon />
                      </span>
                    )}
                    <span className="text-[15px]">{name}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Copyright Section */}
        <div className="w-full py-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Yashith Prabhashwara. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/" className="text-gray-500 hover:text-white text-xs transition-colors">Privacy Policy</Link>
            <Link href="/" className="text-gray-500 hover:text-white text-xs transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Background Glow Effect */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-900/20 blur-[120px] rounded-full -z-10" />
    </footer>
  );
};
