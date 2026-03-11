"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export const SkillText = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <motion.div
        variants={slideInFromTop(0.5)}
        className="Welcome-box py-[10px] px-[15px] border border-[#7042f88b] opacity-[0.9]"
      >
        <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
        <h1 className="Welcome-text text-[13px]">
          Professional Tech Stack
        </h1>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-7xl font-black text-white text-center mt-6 px-4"
      >
        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 bg-[length:200%_auto] animate-[gradient_8s_linear_infinite] drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]">Skills</span>
      </motion.h1>

      <motion.div
        variants={slideInFromLeft(0.5)}
        className="text-[18px] sm:text-[24px] px-4 text-white font-medium mt-[10px] text-center mb-[10px] opacity-70"
      >
        Making apps with modern technologies.
      </motion.div>
    </div>
  );
};
