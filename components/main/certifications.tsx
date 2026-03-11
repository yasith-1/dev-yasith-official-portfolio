"use client";

import { CERTIFICATIONS } from "@/constants";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { RxBadge, RxExternalLink } from "react-icons/rx";
import { FaCertificate, FaAward, FaUserTie } from "react-icons/fa";

const CertificationCard = ({ cert, index }: { cert: typeof CERTIFICATIONS[number], index: number }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="group relative flex flex-col h-full bg-[#030014]/60 backdrop-blur-2xl border border-white/5 rounded-[40px] overflow-hidden transition-all duration-500 hover:border-purple-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 p-[1.5px] rounded-[40px] bg-gradient-to-br from-purple-500/20 via-cyan-500/20 to-purple-500/20 group-hover:from-purple-500/50 group-hover:via-cyan-500/50 group-hover:to-purple-500/50 transition-all duration-500 -z-10" />

            {/* Glowing background highlights */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-600/10 blur-[80px] rounded-full group-hover:bg-purple-600/20 transition-all duration-700" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-600/10 blur-[80px] rounded-full group-hover:bg-cyan-600/20 transition-all duration-700" />

            {/* Certificate Image Container */}
            <div className="relative w-full aspect-[16/10] overflow-hidden m-3 w-[calc(100%-24px)] rounded-[28px] bg-[#050510] border border-white/5 shadow-2xl group/img" style={{ transform: "translateZ(20px)" }}>
                <Image
                    src={cert.image}
                    alt={cert.title}
                    width={500}
                    height={300}
                    className="w-full h-full object-contain transition-all duration-1000 group-hover/img:scale-110 opacity-80 group-hover/img:opacity-100"
                />

                {/* Image Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 translate-x-[-150%] group-hover/img:translate-x-[150%] transition-transform duration-1000 ease-in-out" />

                {/* Badge Overlay */}
                <div className="absolute top-4 right-4 translate-z-[30px]">
                    <div className="bg-black/40 backdrop-blur-md p-2 rounded-xl border border-white/10 shadow-lg">
                        <FaCertificate className="text-cyan-400 w-4 h-4 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col p-5 pt-1 h-full z-10" style={{ transform: "translateZ(10px)" }}>
                <div className="flex justify-between items-center mb-3 text-xs">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-cyan-400 bg-cyan-400/10 px-3 py-1.5 rounded-lg uppercase tracking-[0.2em] border border-cyan-400/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                            {cert.issuer}
                        </span>
                    </div>
                    <span className="text-[11px] font-semibold text-gray-400/80 italic font-mono">
                        {cert.date}
                    </span>
                </div>

                <h3 className="text-xl md:text-2xl font-black text-white mb-3 leading-none tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-200 transition-all duration-300">
                    {cert.title}
                </h3>

                <div className="flex items-center gap-2.5 mb-3 overflow-hidden">
                    <div className="p-1.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400/80">
                        <FaUserTie className="text-xs" />
                    </div>
                    <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 tracking-wide uppercase">
                        {cert.instructor}
                    </span>
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-purple-500/40 to-transparent" />
                </div>

                <p className="text-sm text-gray-400/90 line-clamp-3 mb-4 leading-relaxed font-medium">
                    {cert.description}
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2.5 mb-1">
                    {(cert as any).skills?.map((skill: string) => (
                        <span
                            key={skill}
                            className="text-[10px] font-bold bg-white/5 text-gray-300 px-3 py-1.5 rounded-full border border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all duration-300 cursor-default"
                        >
                            #{skill.replace(/\s+/g, '').toUpperCase()}
                        </span>
                    ))}
                </div>

                {/* Footer Action */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-auto">
                    <button
                        onClick={() => window.open(cert.image, '_blank')}
                        className="flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-500 group/btn"
                    >
                        <span className="text-[13px] font-black tracking-widest uppercase">View Full Credential</span>
                        <div className="relative">
                            <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover/btn:bg-purple-500 group-hover/btn:text-white group-hover/btn:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-500 group-hover/btn:rotate-12">
                                <RxExternalLink className="w-4 h-4" />
                            </div>
                        </div>
                    </button>

                    <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="flex items-center"
                    >
                        <FaAward className="text-cyan-400/40 w-5 h-5" />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export const Certifications = () => {
    return (
        <section
            id="certifications"
            className="relative flex flex-col items-center justify-center py-32 z-[20] overflow-hidden"
        >
            {/* Background Atmosphere */}
            <div className="absolute top-[10%] left-[-15%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-[10%] right-[-15%] w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[150px] pointer-events-none animate-pulse" />

            <div className="flex flex-col items-center justify-center mb-16 md:mb-24 px-4 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "backOut" }}
                    className="relative px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8 group cursor-default overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-purple-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <div className="flex items-center gap-3 relative z-10">
                        <RxBadge className="text-cyan-400 h-5 w-5 animate-pulse" />
                        <span className="text-[13px] font-black text-white tracking-[0.3em] uppercase">Achievements</span>
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-8xl font-black text-white text-center leading-none"
                >
                    My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 bg-[length:200%_auto] animate-[gradient_8s_linear_infinite] drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">Certifications</span>
                </motion.h1>

                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100px" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-1.5 bg-gradient-to-r from-purple-500 to-cyan-500 mt-6 rounded-full"
                />

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-gray-400 mt-8 text-center max-w-[700px] text-lg md:text-xl font-medium px-4 opacity-80"
                >
                    Continuous learning and skill validation through industry-recognized platforms.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6 md:px-14 max-w-[1500px] w-full mt-10">
                {CERTIFICATIONS.map((cert, index) => (
                    <CertificationCard key={cert.title} cert={cert} index={index} />
                ))}
            </div>
        </section>
    );
};

