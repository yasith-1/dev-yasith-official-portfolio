"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/constants";
import Image from "next/image";
import { RxLinkedinLogo } from "react-icons/rx";

export const Testimonials = () => {
    return (
        <section
            id="testimonials"
            className="flex flex-col items-center justify-center py-20 z-[20] relative"
        >
            <div className="absolute top-0 left-0 w-full h-full bg-[#030014] -z-10" />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center mb-16 px-4 text-center"
            >
                <h1 className="text-[40px] md:text-[50px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 pb-4">
                    Professional Recommendations
                </h1>
                <p className="text-gray-400 text-lg max-w-[600px]">
                    Honored to have collaborated with exceptional leaders and mentors who have shared their experiences working with me.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-10 max-w-[1240px] w-full">
                {TESTIMONIALS.map((testimonial, index) => (
                    <motion.div
                        key={testimonial.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="flex flex-col p-8 rounded-3xl border border-[#2A0E61] bg-[#0300145e] backdrop-blur-xl relative overflow-hidden group hover:border-purple-500/50 transition-all duration-500 shadow-2xl shadow-purple-500/5"
                    >
                        {/* Top Section: Avatar & Name */}
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-purple-500/30 group-hover:border-purple-500 transition-colors">
                                    <div className="bg-gradient-to-br from-purple-900 to-indigo-900 w-full h-full flex items-center justify-center text-white font-bold text-xl uppercase">
                                        {testimonial.name.split(" ").map(n => n[0]).join("")}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-white font-bold text-lg leading-tight group-hover:text-cyan-400 transition-colors">
                                        {testimonial.name}
                                    </span>
                                    <span className="text-purple-400 text-xs font-medium max-w-[200px] md:max-w-full line-clamp-2 leading-snug">
                                        {testimonial.role}
                                    </span>
                                </div>
                            </div>
                            <a
                                href="https://www.linkedin.com/in/yashith-prabhashwara/details/recommendations/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-[#0A66C2] transition-colors"
                                title="View on LinkedIn"
                            >
                                <RxLinkedinLogo className="w-6 h-6" />
                            </a>
                        </div>

                        {/* Quote Icon */}
                        <div className="absolute top-20 right-8 text-8xl text-white/[0.03] font-serif select-none group-hover:text-purple-500/[0.08] transition-colors pointer-events-none">
                            &quot;
                        </div>

                        {/* Testimonial Text */}
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed relative z-10 mb-auto italic">
                            &quot;{testimonial.text}&quot;
                        </p>

                        {/* Bottom Accent Decor */}
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-600/5 blur-[60px] group-hover:bg-purple-600/10 transition-all" />
                        <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mt-8 rounded-full opacity-50 group-hover:w-20 group-hover:opacity-100 transition-all duration-500" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
