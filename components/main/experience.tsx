"use client";

import { JOURNEY } from "@/constants";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "@/lib/motion";

export const Experience = () => {
    return (
        <section id="experience" className="flex flex-col items-center justify-center py-20 z-[20]">
            <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-7xl font-black text-white text-center mb-10 px-4"
            >
                My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 bg-[length:200%_auto] animate-[gradient_8s_linear_infinite] drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]">Journey</span>
            </motion.h1>

            <div className="relative flex flex-col items-center px-4 md:px-10 w-full max-w-[1200px]">
                {/* Vertical Line - Shifted further left on mobile */}
                <div className="absolute left-[20px] md:left-[50%] -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-purple-500/20 via-cyan-500/50 to-purple-500/20" />

                <div className="w-full flex flex-col gap-10 md:gap-20">
                    {JOURNEY.map((item, index) => (
                        <div key={index} className="flex items-center justify-center lg:justify-between w-full relative">
                            {/* Timeline Dot */}
                            <div className="absolute left-[20px] md:left-[50%] -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] z-10" />

                            {/* Mobile/Default Layout (All on right of line) vs Desktop Layout (Alternating) */}
                            <div className={`w-full flex flex-col lg:flex-row ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center justify-between`}>
                                <motion.div
                                    variants={(index % 2 === 0 ? slideInFromLeft(0.3) : slideInFromRight(0.3)) as any}
                                    initial="hidden"
                                    whileInView="visible"
                                    className={`ml-[40px] md:ml-[60px] lg:ml-0 w-[calc(100%-60px)] md:w-[calc(100%-80px)] lg:w-[45%] p-5 md:p-6 rounded-2xl bg-[#03001427] backdrop-blur-md border border-[#2A0E61] shadow-2xl hover:border-purple-500/30 transition-all ${index % 2 === 0 ? 'lg:text-end' : 'lg:text-start'}`}
                                >
                                    <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">{item.title}</h3>
                                    <p className={`${index % 2 === 0 ? 'text-cyan-400' : 'text-purple-400'} text-xs md:text-sm font-semibold mb-2`}>{item.location}</p>
                                    <p className="text-gray-400 text-[10px] md:text-sm italic mb-3 md:mb-4">{item.date}</p>
                                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">{item.description}</p>
                                </motion.div>
                                <div className="hidden lg:block w-[45%]" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
