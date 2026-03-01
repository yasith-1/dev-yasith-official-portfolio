"use client";

import { CERTIFICATIONS } from "@/constants";
import { motion } from "framer-motion";
import Image from "next/image";
import { RxBadge } from "react-icons/rx";

export const Certifications = () => {
    return (
        <section
            id="certifications"
            className="relative flex flex-col items-center justify-center py-20 z-[20] overflow-hidden"
        >
            {/* Background Glow */}
            <div className="absolute top-[10%] left-[-10%] w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[-10%] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="flex flex-col items-center justify-center mb-10 md:mb-20 px-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="Welcome-box py-[8px] px-[12px] border border-[#7042f88b] opacity-[0.9] mb-4"
                >
                    <RxBadge className="text-[#b49bff] mr-[10px] h-5 w-5" />
                    <h1 className="Welcome-text text-[13px]">My Achievements</h1>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl font-bold text-white text-center"
                >
                    Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">Certifications</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-gray-400 mt-4 text-center max-w-[600px] text-lg px-4"
                >
                    Continuous learning and skill validation through industry-recognized platforms.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-10 max-w-[1400px] w-full mt-10">
                {CERTIFICATIONS.map((cert, index) => (
                    <motion.div
                        key={cert.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="group relative flex flex-col h-full bg-[#0300145e] backdrop-blur-xl border border-[#2A0E61]/50 rounded-[32px] overflow-hidden hover:border-purple-500/50 transition-all duration-300 shadow-2xl"
                    >
                        {/* Card Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Certificate Image Container */}
                        <div className="relative w-full aspect-[16/10] overflow-hidden m-4 w-[calc(100%-32px)] rounded-[20px] bg-[#0c0c14] border border-white/5 shadow-inner group">
                            <Image
                                src={cert.image}
                                alt={cert.title}
                                width={500}
                                height={300}
                                className="w-full h-full object-contain transition-all duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                            />
                            {/* Subtle overlay for depth */}
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />

                            <div className="absolute bottom-2 right-2">
                                <div className="bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <RxBadge className="text-cyan-400 w-4 h-4" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col p-6 pt-0 h-full z-10">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-bold text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full uppercase tracking-widest border border-cyan-400/20">
                                    {cert.issuer}
                                </span>
                                <span className="text-[10px] font-medium text-gray-500 italic bg-white/5 px-3 py-1 rounded-full border border-white/5">
                                    {cert.date}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-purple-300 transition-colors duration-300">
                                {cert.title}
                            </h3>

                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-[1px] w-4 bg-purple-500/50" />
                                <span className="text-[11px] font-medium text-purple-400">
                                    Instructed by {cert.instructor}
                                </span>
                            </div>

                            <p className="text-sm text-gray-400 line-clamp-3 mb-6 leading-relaxed">
                                {cert.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {(cert as any).skills?.map((skill: string) => (
                                    <span key={skill} className="text-[10px] bg-white/5 text-gray-400 px-2 py-1 rounded-lg border border-white/5 hover:border-purple-500/30 transition-colors duration-300">
                                        #{skill.replace(/\s+/g, '')}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-1 border-t border-white/5 mt-auto">
                                <button
                                    onClick={() => window.open(cert.image, '_blank')}
                                    className="flex items-center gap-2.5 text-gray-300 hover:text-white transition-all duration-300 group/btn"
                                >
                                    <span className="text-[13px] font-semibold tracking-wide">View Credential</span>
                                    <div className="p-1.5 rounded-full bg-white/5 group-hover/btn:bg-purple-500/20 transition-all duration-300">
                                        <svg
                                            className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </div>
                                </button>

                                <div className="flex items-center -space-x-1">
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
