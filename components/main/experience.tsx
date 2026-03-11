"use client";

import { JOURNEY } from "@/constants";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "@/lib/motion";
import { FaMapMarkerAlt, FaCalendarAlt, FaBriefcase, FaGraduationCap } from "react-icons/fa";

export const Experience = () => {
    return (
        <section id="experience" className="flex flex-col items-center justify-center py-20 z-[20] overflow-hidden">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-7xl font-black text-white text-center mb-16 px-4"
            >
                My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 bg-[length:200%_auto] animate-[gradient_8s_linear_infinite] drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">Journey</span>
            </motion.h1>

            <div className="relative flex flex-col items-center px-4 md:px-10 w-full max-w-[1200px]">
                {/* Vertical Line with Glow */}
                <div className="absolute left-[20px] md:left-[50%] -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-transparent via-purple-500/50 to-transparent">
                    <div className="absolute inset-0 w-full h-full bg-cyan-500/30 blur-sm" />
                </div>

                <div className="w-full flex flex-col gap-12 md:gap-24">
                    {JOURNEY.map((item, index) => (
                        <div key={index} className="flex items-center justify-center lg:justify-between w-full relative group">
                            {/* Timeline Dot with Pulse Effect */}
                            <div className="absolute left-[20px] md:left-[50%] -translate-x-1/2 z-20">
                                <div className="relative flex items-center justify-center">
                                    <div className="w-5 h-5 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] z-10" />
                                    <div className="absolute w-8 h-8 rounded-full bg-cyan-400/30 animate-ping" />
                                </div>
                            </div>

                            {/* Layout Wrapper */}
                            <div className={`w-full flex flex-col lg:flex-row ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center justify-between`}>
                                <motion.div
                                    variants={(index % 2 === 0 ? slideInFromLeft(0.5) : slideInFromRight(0.5)) as any}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-100px" }}
                                    whileHover={{ y: -5, scale: 1.01 }}
                                    className={`ml-[45px] md:ml-[60px] lg:ml-0 w-[calc(100%-60px)] md:w-[calc(100%-80px)] lg:w-[45%] p-[1px] rounded-2xl bg-gradient-to-br from-purple-500/20 via-cyan-500/20 to-purple-500/20 hover:from-purple-500/50 hover:via-cyan-500/50 hover:to-purple-500/50 transition-all duration-500 shadow-2xl relative overflow-hidden active:scale-95`}
                                >
                                    {/* Card Content */}
                                    <div className={`bg-[#030014]/90 backdrop-blur-3xl p-6 md:p-8 rounded-2xl h-full flex flex-col ${index % 2 === 0 ? 'lg:items-end lg:text-end' : 'lg:items-start lg:text-start'}`}>
                                        <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'lg:flex-row-reverse' : 'flex-row'}`}>
                                            <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-white/10 text-cyan-400 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                                                {item.title.toLowerCase().includes('intern') || item.title.toLowerCase().includes('member') ? <FaBriefcase className="text-lg" /> : <FaGraduationCap className="text-lg" />}
                                            </div>
                                            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors duration-300">{item.title}</h3>
                                        </div>

                                        <div className={`flex flex-wrap gap-x-5 gap-y-2 mb-5 text-sm font-semibold ${index % 2 === 0 ? 'lg:justify-end lg:flex-row-reverse' : 'justify-start'}`}>
                                            <span className="flex items-center gap-2 text-cyan-400/90 py-1 px-3 rounded-full bg-cyan-500/5 border border-cyan-500/10">
                                                <FaMapMarkerAlt className="text-xs" />
                                                {item.location}
                                            </span>
                                            <span className="flex items-center gap-2 text-purple-400/90 py-1 px-3 rounded-full bg-purple-500/5 border border-purple-500/10">
                                                <FaCalendarAlt className="text-xs" />
                                                {item.date}
                                            </span>
                                        </div>

                                        <div className={`w-16 h-1 bg-gradient-to-r ${index % 2 === 0 ? 'from-transparent via-cyan-500 to-purple-500' : 'from-purple-500 via-cyan-500 to-transparent'} mb-6 rounded-full group-hover:w-24 transition-all duration-500`} />

                                        <p className="text-gray-300 text-sm md:text-base leading-relaxed font-normal opacity-90">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Decorative subtle glow background */}
                                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/10 blur-[60px] rounded-full -z-10 group-hover:bg-purple-500/20 transition-all duration-500" />
                                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-500/10 blur-[60px] rounded-full -z-10 group-hover:bg-cyan-500/20 transition-all duration-500" />
                                </motion.div>

                                {/* Spacer for large screens */}
                                <div className="hidden lg:block w-[45%]" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

