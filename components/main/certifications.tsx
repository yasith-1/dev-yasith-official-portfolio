"use client";

import { CERTIFICATIONS } from "@/constants";
import { motion } from "framer-motion";
import Image from "next/image";

export const Certifications = () => {
    return (
        <section id="certifications" className="flex flex-col items-center justify-center py-20 z-[20]">
            <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20"
            >
                Certifications
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-10 max-w-[1200px]">
                {CERTIFICATIONS.map((cert, index) => (
                    <motion.div
                        key={cert.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="group relative h-full flex flex-col p-6 rounded-2xl border border-[#2A0E61] bg-[#03001427] backdrop-blur-md transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                    >
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 bg-white/5 border border-white/10 flex items-center justify-center">
                            {/* Note: Placeholder images are being used, user should replace with actual cert images */}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-700 font-bold opacity-30 select-none">
                                {cert.issuer}
                            </div>
                            <div className="relative z-10 p-4 text-center">
                                <p className="text-white font-bold text-lg mb-2">{cert.title}</p>
                                <p className="text-cyan-400 text-sm">{cert.issuer}</p>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors uppercase tracking-wider">{cert.title}</h3>
                        <p className="text-gray-400 text-sm mb-4 font-semibold">{cert.issuer} • {cert.date}</p>

                        <div className="mt-auto pt-6 flex items-center gap-2 text-cyan-400 font-medium text-sm">
                            <span className="cursor-pointer group-hover:underline">Verify Certificate</span>
                            <svg
                                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
