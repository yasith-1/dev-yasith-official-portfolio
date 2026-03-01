"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaWhatsapp,
  FaGlobe,
  FaMedium
} from "react-icons/fa";
import { SiSalesforce } from "react-icons/si";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
  slideInFromBottom,
} from "@/lib/motion";

export const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 mt-20 lg:mt-40 w-full z-[20] gap-10 lg:gap-0"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start lg:max-w-[60%]">

        {/* Open to Work Badge */}
        <motion.div
          variants={slideInFromTop(0.5) as any}
          className="pill-badge w-fit border-[#7042f88b] opacity-[0.9]"
        >
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <h1 className="text-cyan-300 text-[12px] lg:text-[13px] font-medium tracking-wide font-sans">
            Open to Full-Time & Internship Opportunities
          </h1>
        </motion.div>

        {/* Name Title */}
        <motion.div
          variants={slideInFromLeft(0.5) as any}
          className="flex flex-col gap-1 mt-6"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight font-sans">
            Yashith
          </h1>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold glow-text gradient-text-blue tracking-tight pb-2 font-sans">
            Prabhashwara
          </h1>
        </motion.div>

        {/* Headline */}
        <motion.div
          variants={slideInFromLeft(0.6) as any}
          className="flex flex-wrap items-center gap-3 text-lg sm:text-xl lg:text-3xl text-gray-300 font-medium font-sans"
        >
          <span className="opacity-70">I build</span>
          <span className="text-white px-3 py-1.5 sm:px-4 sm:py-1.5 bg-white/5 rounded-xl border border-white/10 backdrop-blur-lg shadow-2xl">
            Scalable Enterprise Applications
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={slideInFromLeft(0.8) as any}
          className="text-base lg:text-lg text-gray-400 my-2 max-w-[600px] leading-relaxed font-sans"
        >
          Passionate <span className="text-white font-medium">Software Engineer</span> with hands-on experience in full-stack development.
          Proficient in building robust, user-centered solutions using <span className="text-white font-medium italic">Java (Spring Boot)</span>,
          <span className="text-white font-medium italic"> React</span>,
          <span className="text-white font-medium italic"> Angular</span>, and modern web technologies.
        </motion.p>

        {/* Seeking Box */}
        <motion.div
          variants={slideInFromLeft(0.9) as any}
          className="text-gray-400 text-sm lg:text-base bg-white/5 p-4 rounded-2xl border border-white/5 max-w-[550px] shadow-inner font-sans"
        >
          Seeking <span className="text-white font-semibold underline decoration-cyan-500/50 underline-offset-4">career growth</span> or
          <span className="text-white font-semibold underline decoration-purple-500/50 underline-offset-4"> internship</span> opportunities to contribute to a collaborative engineering team and deliver robust software solutions.
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={slideInFromLeft(1) as any}
          className="flex flex-col sm:flex-row items-center gap-5 mt-4 w-full sm:w-auto"
        >
          <a href="#projects" className="w-full sm:w-auto px-8 py-4 button-primary text-white cursor-pointer rounded-2xl font-semibold transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-lg shadow-purple-500/20">
            <SparklesIcon className="h-5 w-5 text-cyan-300" />
            View My Work
          </a>
          <a href="/resume/Yashith_Prabhashwara_CV.pdf" download="Yashith_Prabhashwara_CV.pdf" className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white cursor-pointer rounded-2xl font-semibold border border-white/10 hover:bg-white/10 transition-all backdrop-blur-md text-center">
            Download Resume
          </a>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(1.2) as any}
          className="flex flex-row gap-5 mt-10"
        >
          <a href="https://github.com/yasith-1" target="_blank" className="social-icon group">
            <FaGithub className="text-xl text-gray-400 group-hover:text-white transition-colors" />
          </a>
          <a href="https://linkedin.com/in/yashith-prabhashwara" target="_blank" className="social-icon group">
            <FaLinkedin className="text-xl text-gray-400 group-hover:text-blue-500 transition-colors" />
          </a>
          <a href="mailto:yashith.wd@gmail.com" className="social-icon group">
            <FaEnvelope className="text-xl text-gray-400 group-hover:text-red-400 transition-colors" />
          </a>
          <a href="https://wa.me/94701410113" target="_blank" className="social-icon group">
            <FaWhatsapp className="text-xl text-gray-400 group-hover:text-green-500 transition-colors" />
          </a>
          <a href="https://medium.com/@yasithofficialart" target="_blank" className="social-icon group">
            <FaMedium className="text-xl text-gray-400 group-hover:text-cyan-400 transition-colors" />
          </a>
        </motion.div>
      </div>

      {/* Profile Side */}
      <motion.div
        variants={slideInFromRight(0.8) as any}
        className="relative w-full lg:w-[40%] flex justify-center items-center mt-20 lg:mt-0"
      >
        <div className="relative blob-frame h-[320px] w-[320px] lg:h-[480px] lg:w-[480px] flex items-center justify-center p-6 bg-transparent">
          <div className="relative overflow-hidden blob-inner h-full w-full border-4 border-white/5 shadow-2xl">
            <Image
              src="/profile.jpg"
              alt="Yashith Prabhashwara"
              fill
              className="object-cover select-none scale-100 hover:scale-110 transition-all duration-700 ease-in-out"
              draggable={false}
              priority
            />
          </div>

          {/* Floating Badges */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="absolute top-12 -right-6 lg:-right-12 bg-black/80 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-2xl flex items-center gap-3 shadow-2xl z-30 whitespace-nowrap"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
            <span className="text-white text-xs lg:text-sm font-semibold tracking-wide uppercase">Software Dev</span>
            <div className="ml-2 px-1.5 py-0.5 bg-purple-500/20 rounded text-[10px] text-purple-300 border border-purple-500/30 font-mono italic font-bold">{"</>"}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.7, duration: 0.6 }}
            className="absolute bottom-16 -left-6 lg:-left-12 bg-black/80 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-2xl flex items-center gap-3 shadow-2xl z-30 whitespace-nowrap"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            <span className="text-white text-xs lg:text-sm font-semibold tracking-wide uppercase">Full-Stack Developer</span>
            <div className="ml-2 px-1.5 py-0.5 bg-cyan-500/20 rounded text-[10px] text-cyan-300 border border-cyan-500/30 font-mono italic font-bold">{"{Dev}"}</div>
          </motion.div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] -z-10 opacity-30 pointer-events-none">
          <div className="absolute inset-0 border border-purple-500/20 rounded-full animate-[spin_20s_linear_infinite] border-dashed" />
          <div className="absolute inset-10 border border-cyan-500/10 rounded-full animate-[spin_30s_linear_infinite_reverse] border-dotted" />
        </div>
      </motion.div>

      {/* Scroll Indicator Placeholder */}
      <motion.div
        variants={slideInFromBottom(2) as any}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-20 hover:opacity-100 transition-opacity duration-300 group cursor-default"
      >
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-500 group-hover:text-white transition-colors">Scroll</span>
        <div className="w-[2px] h-20 bg-gradient-to-b from-purple-500 to-transparent rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
      </motion.div>
    </motion.div>
  );
};
