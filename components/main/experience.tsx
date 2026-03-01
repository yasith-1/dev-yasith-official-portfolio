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
                className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20"
            >
                My Journey
            </motion.h1>

            <div className="relative flex flex-col items-center px-10 w-full max-w-[1200px]">
                {/* Vertical Line */}
                <div className="absolute left-[50%] -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-purple-500/20 via-cyan-500/50 to-purple-500/20" />

                <div className="w-full flex flex-col gap-20">
                    {JOURNEY.map((item, index) => (
                        <div key={index} className="flex items-center justify-between w-full relative">
                            {/* Timeline Dot */}
                            <div className="absolute left-[50%] -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] z-10" />

                            {/* Toggle Left/Right Content */}
                            {index % 2 === 0 ? (
                                <>
                                    <motion.div
                                        variants={slideInFromLeft(0.3 + index * 0.1) as any}
                                        initial="hidden"
                                        whileInView="visible"
                                        className="w-[45%] p-6 rounded-2xl bg-[#03001427] backdrop-blur-md border border-[#2A0E61] shadow-2xl hover:border-purple-500/30 transition-all text-end"
                                    >
                                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                        <p className="text-cyan-400 text-sm font-semibold mb-3">{item.location}</p>
                                        <p className="text-gray-400 text-sm italic mb-4">{item.date}</p>
                                        <p className="text-gray-300 text-base leading-relaxed">{item.description}</p>
                                    </motion.div>
                                    <div className="w-[45%]" />
                                </>
                            ) : (
                                <>
                                    <div className="w-[45%]" />
                                    <motion.div
                                        variants={slideInFromRight(0.3 + index * 0.1) as any}
                                        initial="hidden"
                                        whileInView="visible"
                                        className="w-[45%] p-6 rounded-2xl bg-[#03001427] backdrop-blur-md border border-[#2A0E61] shadow-2xl hover:border-cyan-500/30 transition-all text-start"
                                    >
                                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                        <p className="text-purple-400 text-sm font-semibold mb-3">{item.location}</p>
                                        <p className="text-gray-400 text-sm italic mb-4">{item.date}</p>
                                        <p className="text-gray-300 text-base leading-relaxed">{item.description}</p>
                                    </motion.div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
