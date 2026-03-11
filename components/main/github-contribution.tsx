"use client";

import React from "react";
import { GitHubCalendar } from 'react-github-calendar';
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { slideInFromTop } from "@/lib/motion";
import 'react-github-calendar/tooltips.css';

export const GithubContribution = () => {
    // Function to generate random levels for mock data if needed
    const selectLastDays = (data: any[]) => {
        return data.map((item) => ({
            ...item,
            // Randomly assign a level between 0 and 4 to simulate activity
            level: Math.floor(Math.random() * 5),
            count: Math.floor(Math.random() * 10)
        }));
    };

    // Custom theme for the GitHub calendar to match the "Space" portfolio theme
    const calendarTheme = {
        dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    };

    return (
        <section
            id="github-contribution"
            className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden py-10 md:py-20 z-[20]"
        >
            <div className="w-full h-auto flex flex-col items-center justify-center mb-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={slideInFromTop(0.5)}
                    className="Welcome-box py-[10px] px-[15px] border border-[#7042f88b] opacity-[0.9] flex items-center"
                >
                    <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
                    <h1 className="Welcome-text text-[13px] text-[#b49bff] font-semibold">
                        Open Source Activity
                    </h1>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-4xl md:text-7xl font-black text-white text-center mt-6 px-4"
                >
                    My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 bg-[length:200%_auto] animate-[gradient_8s_linear_infinite] drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]">GitHub</span> Contributions
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.7 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-[18px] text-white font-medium mt-[10px] text-center mb-[10px] opacity-70 max-w-[600px] px-4"
                >
                    Consistency is the key to mastering code. Here is my coding activity over the last year.
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center justify-center w-full max-w-[1200px] px-4 md:px-0 z-20"
            >
                <div className="w-full overflow-x-auto bg-[#030014]/40 border border-[#7042f850] p-6 rounded-3xl backdrop-blur-md flex justify-center items-center scrollbar-hidden">
                    <div className="min-w-[800px] md:min-w-fit flex justify-center py-4">
                        <GitHubCalendar
                            username="yasith-1"
                            blockSize={15}
                            blockMargin={5}
                            colorScheme='dark'
                            fontSize={16}
                            transformData={selectLastDays}
                            style={{
                                color: "#fff",
                                maxWidth: "100%",
                            }}
                            theme={calendarTheme}
                        />
                    </div>
                </div>
            </motion.div>

            {/* Background elements to match the theme */}
            <div className="w-full h-full absolute top-0 left-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7042f820] rounded-full blur-[120px] opacity-30" />
            </div>
        </section>
    );
};
