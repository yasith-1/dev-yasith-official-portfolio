"use client";

import { BADGES } from "@/constants";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { RxBadge, RxExternalLink } from "react-icons/rx";
import { FaAward, FaQrcode, FaCheckCircle, FaDownload } from "react-icons/fa";
import React from "react";

const BadgeCard = ({ badge, index }: { badge: typeof BADGES[number], index: number }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / rect.width - 0.5);
        y.set(mouseY / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="group relative flex flex-col h-full bg-[#030014]/60 backdrop-blur-2xl border border-white/5 rounded-[20px] overflow-hidden transition-all duration-500 hover:border-purple-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 p-[1.5px] rounded-[20px] bg-gradient-to-br from-purple-500/20 via-cyan-500/20 to-purple-500/20 transition-all duration-500 -z-10" />

            {/* Glowing background highlights */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-600/10 blur-[80px] rounded-full group-hover:bg-purple-600/20 transition-all duration-700" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-600/10 blur-[80px] rounded-full group-hover:bg-cyan-600/20 transition-all duration-700" />

            {/* Badge Emblem */}
            <div className="relative flex items-center justify-center pt-10 pb-6" style={{ transform: "translateZ(30px)" }}>
                {/* Radial glow behind the emblem */}
                <div className="absolute w-44 h-44 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 blur-[50px] rounded-full group-hover:from-purple-500/40 group-hover:to-cyan-500/40 transition-all duration-700" />

                <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                >
                    <Image
                        src={badge.image}
                        alt={badge.title}
                        width={200}
                        height={200}
                        className="relative w-40 h-40 object-contain drop-shadow-[0_10px_30px_rgba(168,85,247,0.25)] transition-transform duration-500 group-hover:scale-110"
                    />
                </motion.div>

                {/* QR code chip (scannable, zooms on hover) */}
                {badge.qr && (
                    <div className="absolute top-4 right-4 z-30" style={{ transform: "translateZ(50px)" }}>
                        <div className="group/qr flex flex-col items-center gap-1.5 cursor-zoom-in">
                            <div className="p-1.5 bg-white rounded-xl ring-1 ring-cyan-400/30 shadow-[0_6px_20px_rgba(0,0,0,0.45)] transition-all duration-300 origin-top-right group-hover/qr:scale-[3.2] group-hover/qr:ring-cyan-400/60 group-hover/qr:shadow-[0_0_35px_rgba(34,211,238,0.5)]">
                                <Image
                                    src={badge.qr}
                                    alt={`${badge.title} verification QR`}
                                    width={120}
                                    height={120}
                                    className="w-11 h-11 object-contain"
                                />
                            </div>
                            <div className="flex items-center gap-1 text-[8px] font-black text-cyan-300/90 uppercase tracking-[0.2em] transition-opacity duration-300 group-hover/qr:opacity-0 pointer-events-none">
                                <FaQrcode className="w-2 h-2" />
                                <span>Scan</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Verified chip for badges without a QR (keeps the card row balanced) */}
                {!badge.qr && (
                    <div className="absolute top-5 right-5 z-30" style={{ transform: "translateZ(50px)" }}>
                        <div className="flex items-center gap-1.5 bg-cyan-400/10 px-2.5 py-1.5 rounded-lg border border-cyan-400/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                            <FaCheckCircle className="w-2.5 h-2.5 text-cyan-400" />
                            <span className="text-[8px] font-black text-cyan-300/90 uppercase tracking-[0.2em]">Verified</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex flex-col flex-grow p-6 pt-0 z-10" style={{ transform: "translateZ(10px)" }}>
                <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                    <span className="text-[10px] font-black text-cyan-400 bg-cyan-400/10 px-3 py-1.5 rounded-lg uppercase tracking-[0.15em] border border-cyan-400/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                        {badge.organization}
                    </span>
                    <span className="text-[11px] font-semibold text-gray-400/80 italic font-mono">
                        {badge.issued}
                    </span>
                </div>

                <h3 className="text-lg md:text-xl font-black text-white mb-5 leading-snug tracking-tight text-center min-h-[84px] line-clamp-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-200 transition-all duration-300">
                    {badge.title}
                </h3>

                {/* Footer Action */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                    <button
                        onClick={() => window.open(badge.credentialLink, '_blank')}
                        className="flex items-center gap-3 cursor-pointer text-purple-200 hover:text-white transition-all duration-500 group/btn"
                    >
                        <span className="text-[12px] font-black tracking-widest uppercase underline decoration-purple-400/40 decoration-2 underline-offset-4 group-hover/btn:decoration-purple-300">Show Credentials</span>
                        <div className="relative">
                            <div className="p-2 rounded-xl bg-purple-500/20 border border-purple-400/40 text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.2)] group-hover/btn:bg-purple-500 group-hover/btn:text-white group-hover/btn:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-500">
                                <RxExternalLink className="w-4 h-4" />
                            </div>
                        </div>
                    </button>

                    <div className="flex items-center gap-3">
                        {badge.qr && (
                            <a
                                href={badge.qr}
                                download={`${badge.credentialLink.split("/").pop()}-qr.png`}
                                className="flex items-center gap-2 cursor-pointer text-cyan-200 hover:text-cyan-100 transition-all duration-300 group/dl"
                                title="Download QR code"
                                aria-label="Download QR code"
                            >
                                <span className="text-[12px] font-black tracking-widest uppercase hidden sm:inline">QR</span>
                                <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.2)] group-hover/dl:bg-cyan-500/40 group-hover/dl:border-cyan-300/60 group-hover/dl:shadow-[0_0_20px_rgba(34,211,238,0.45)] transition-all duration-300">
                                    <FaDownload className="w-3.5 h-3.5" />
                                </div>
                            </a>
                        )}

                        <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="flex items-center"
                        >
                            <FaAward className="text-cyan-400/40 w-5 h-5" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export const Badges = () => {
    const [showAll, setShowAll] = React.useState(false);
    const visibleBadges = showAll ? BADGES : BADGES.slice(0, 6);

    return (
        <section
            id="badges"
            className="relative flex flex-col items-center justify-center py-32 z-[20] overflow-hidden"
        >
            {/* Background Atmosphere */}
            <div className="absolute top-[10%] right-[-15%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-[10%] left-[-15%] w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[150px] pointer-events-none animate-pulse" />

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
                        <span className="text-[13px] font-black text-white tracking-[0.3em] uppercase">Recognition</span>
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-8xl font-black text-white text-center leading-none"
                >
                    My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 bg-[length:200%_auto] animate-[gradient_8s_linear_infinite] drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">Badges</span>
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
                    Verified badges earned through hands-on workshops, meetups, and developer summits.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-14 max-w-[1500px] w-full mt-10">
                <AnimatePresence mode="popLayout">
                    {visibleBadges.map((badge, index) => (
                        <BadgeCard key={badge.title} badge={badge} index={index} />
                    ))}
                </AnimatePresence>
            </div>

            {BADGES.length > 6 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mt-12"
                >
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="group relative px-8 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-purple-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <span className="relative z-10 text-sm font-black text-white tracking-[0.2em] uppercase flex items-center gap-2">
                            {showAll ? "Show Less" : "Show All"}
                            <motion.div
                                animate={{ rotate: showAll ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <RxBadge className="w-4 h-4 text-cyan-400" />
                            </motion.div>
                        </span>
                    </button>
                </motion.div>
            )}
        </section>
    );
};
