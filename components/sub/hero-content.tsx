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
      className="flex flex-col lg:flex-row items-center justify-between px-4 sm:px-10 lg:px-20 pt-28 lg:pt-40 pb-20 lg:pb-0 w-full z-[20] gap-16 lg:gap-0 max-w-[1500px] mx-auto overflow-x-clip min-h-[70vh] lg:min-h-screen"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start lg:max-w-[60%]">

        {/* Open to Work Badge */}
        <motion.div
          variants={slideInFromTop(0.5) as any}
          className="pill-badge w-fit border-[#7042f88b] opacity-[0.9] text-[10px] sm:text-xs"
        >
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <h1 className="text-cyan-300 font-medium tracking-wide font-sans">
            Open to Full-Time & Associate Engineer Opportunities
          </h1>
        </motion.div>

        {/* Name Title */}
        <motion.div
          variants={slideInFromLeft(0.5) as any}
          className="flex flex-col gap-1 mt-4"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-white tracking-tighter font-sans leading-none">
            Yashith
          </h1>
          <h1 className="text-[34px] sx:text-[40px] sm:text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 bg-[length:200%_auto] animate-[gradient_8s_linear_infinite] tracking-tighter pb-2 sm:pb-4 font-sans leading-tight drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">
            Prabhashwara
          </h1>
        </motion.div>

        {/* Headline */}
        <motion.div
          variants={slideInFromLeft(0.6) as any}
          className="flex flex-wrap items-center gap-2 sm:gap-4 text-base sm:text-2xl lg:text-3xl text-gray-300 font-semibold font-sans mt-2"
        >
          <span className="opacity-50">I architect</span>
          <span className="text-white px-3 py-1.5 sm:px-5 sm:py-2 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 backdrop-blur-xl shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:border-cyan-500/50 transition-colors duration-500">
            Digital Experiences
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={slideInFromLeft(0.8) as any}
          className="text-sm sm:text-base lg:text-lg text-gray-400 my-2 max-w-[600px] leading-relaxed font-sans"
        >
          Passionate <span className="text-white font-medium">Software Engineer</span> with hands-on experience in full-stack development.
          Proficient in building robust, user-centered solutions using <span className="text-white font-medium italic">Java (Spring Boot)</span>,
          <span className="text-white font-medium italic"> React , JS , Node.JS , Express.JS</span>,
          <span className="text-white font-medium italic"> Angular</span>, and modern web technologies.
        </motion.p>

        {/* Seeking Box */}
        {/* <motion.div
          variants={slideInFromLeft(0.9) as any}
          className="text-gray-400 text-sm lg:text-base bg-white/5 p-4 rounded-2xl border border-white/5 max-w-[550px] shadow-inner font-sans"
        >
          Seeking <span className="text-white font-semibold underline decoration-cyan-500/50 underline-offset-4">career growth</span> or
          <span className="text-white font-semibold underline decoration-purple-500/50 underline-offset-4"> internship</span> opportunities to contribute to a collaborative engineering team and deliver robust software solutions.
        </motion.div> */}

        {/* Action Buttons */}
        <motion.div
          variants={slideInFromLeft(1) as any}
          className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full sm:w-auto"
        >
          <a href="#projects" className="w-full sm:w-auto px-10 py-4 button-primary text-white cursor-pointer rounded-2xl font-semibold transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-lg shadow-purple-500/20">
            <SparklesIcon className="h-5 w-5 text-cyan-300" />
            View My Work
          </a>
          <a href="/resume/Yashith_Prabhashwara_CV.pdf" download="Yashith_Prabhashwara_CV.pdf" className="w-full sm:w-auto px-10 py-4 bg-white/5 text-white cursor-pointer rounded-2xl font-semibold border border-white/10 hover:bg-white/10 transition-all backdrop-blur-md text-center">
            Download Resume
          </a>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(1.2) as any}
          className="flex flex-row gap-5 mt-10 justify-center sm:justify-start"
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
        className="relative w-full lg:w-[40%] flex justify-center items-center mt-10 lg:mt-0"
      >
        <div className="relative blob-frame h-[280px] w-[280px] sm:h-[320px] sm:w-[320px] lg:h-[480px] lg:w-[480px] flex items-center justify-center p-4 bg-transparent">
          <div className="relative overflow-hidden blob-inner h-full w-full border-4 border-white/5 shadow-2xl">
            <Image
              src="/profile.jpg"
              alt="Yashith Prabhashwara"
              fill
              className="object-cover select-none transition-all duration-700 ease-in-out"
              draggable={false}
              priority
            />
          </div>

          {/* Floating Badges */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="absolute -top-4 -right-2 lg:-right-4 bg-black/80 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2 shadow-2xl z-30 whitespace-nowrap"
          >
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <span className="text-white text-[10px] lg:text-xs font-semibold uppercase tracking-wider">Software Dev</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.7, duration: 0.6 }}
            className="absolute -bottom-4 -left-2 lg:-left-4 bg-black/80 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2 shadow-2xl z-30 whitespace-nowrap"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-500" />
            <span className="text-white text-[10px] lg:text-xs font-semibold uppercase tracking-wider">Full-Stack Dev</span>
          </motion.div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] -z-10 opacity-20 pointer-events-none overflow-visible">
          <div className="absolute inset-0 border border-purple-500/20 rounded-full animate-[spin_20s_linear_infinite] border-dashed" />
          <div className="absolute inset-10 border border-cyan-500/10 rounded-full animate-[spin_30s_linear_infinite_reverse] border-dotted" />
        </div>
      </motion.div>

      {/* Scroll Indicator Placeholder */}
      <motion.div
        variants={slideInFromBottom(2) as any}
        className="absolute bottom-[-100px] lg:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-20 hover:opacity-100 transition-opacity duration-300 group cursor-default"
      >
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-500 group-hover:text-white">Scroll</span>
        <div className="w-[2px] h-10 lg:h-20 bg-gradient-to-b from-purple-500 to-transparent rounded-full" />
      </motion.div>
    </motion.div>
  );
};
