"use client";

import { SkillDataProvider } from "@/components/sub/skill-data-provider";
import { SkillText } from "@/components/sub/skill-text";
import React, { useState } from "react";
import { useInView } from "react-intersection-observer";

import {
  BACKEND_SKILL,
  FRONTEND_SKILL,
  FULLSTACK_SKILL,
  OTHER_SKILL,
  TOOLS,
} from "@/constants";

type MainTab = "languages" | "devops" | "tools";
type LangSubTab = "frontend" | "backend";

const MAIN_TABS: { id: MainTab; label: string }[] = [
  { id: "languages", label: "Languages" },
  { id: "devops", label: "Cloud & DevOps" },
  { id: "tools", label: "Tools" },
];

const LANG_SUB_TABS: { id: LangSubTab; label: string }[] = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
];

export const Skills = () => {
  const [activeTab, setActiveTab] = useState<MainTab>("languages");
  const [activeLangTab, setActiveLangTab] = useState<LangSubTab>("frontend");

  // Intersection observer to only play video when in view
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
  });

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden py-10 md:py-20"
    >
      <SkillText />

      {/* Main Tab Buttons */}
      <div className="flex flex-row flex-wrap justify-center gap-3 mb-2 z-[20] mt-4 px-4">
        {MAIN_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-xl border border-[#7042f88b] transition-all duration-300 text-sm font-medium ${activeTab === tab.id
              ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
              : "text-gray-200 hover:bg-[#7042f83b]"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Sub-tabs for Languages */}
      {activeTab === "languages" && (
        <div className="flex flex-row justify-center gap-2 mb-4 z-[20] px-4">
          {LANG_SUB_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveLangTab(tab.id)}
              className={`px-4 py-1.5 rounded-lg border text-xs font-semibold tracking-wide transition-all duration-300 ${activeLangTab === tab.id
                ? "border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow shadow-cyan-500/20"
                : "border-[#7042f850] text-gray-400 hover:border-cyan-500/50 hover:text-cyan-400"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Frontend Sub-Tab */}
      {activeTab === "languages" && activeLangTab === "frontend" && (
        <div className="flex flex-row justify-around flex-wrap mt-2 gap-5 items-center max-w-[900px] px-4">
          {FRONTEND_SKILL.map((skill, i) => (
            <SkillDataProvider
              key={skill.skill_name}
              src={skill.image}
              name={skill.skill_name}
              width={skill.width}
              height={skill.height}
              index={i}
            />
          ))}
        </div>
      )}

      {/* Backend Sub-Tab */}
      {activeTab === "languages" && activeLangTab === "backend" && (
        <div className="flex flex-row justify-around flex-wrap mt-2 gap-5 items-center max-w-[900px] px-4">
          {[...BACKEND_SKILL, ...OTHER_SKILL].map((skill, i) => (
            <SkillDataProvider
              key={skill.skill_name}
              src={skill.image}
              name={skill.skill_name}
              width={skill.width}
              height={skill.height}
              index={i}
            />
          ))}
        </div>
      )}

      {/* Cloud & DevOps Tab */}
      {activeTab === "devops" && (
        <div className="flex flex-row justify-around flex-wrap mt-4 gap-8 items-center max-w-[900px] px-4">
          {FULLSTACK_SKILL.map((skill, i) => (
            <SkillDataProvider
              key={skill.skill_name}
              src={skill.image}
              name={skill.skill_name}
              width={skill.width}
              height={skill.height}
              index={i}
            />
          ))}
        </div>
      )}

      {/* Tools Tab */}
      {activeTab === "tools" && (
        <div className="flex flex-row justify-around flex-wrap mt-4 gap-8 items-center max-w-[1000px] px-4">
          {TOOLS.map((skill, i) => (
            <SkillDataProvider
              key={skill.skill_name}
              src={skill.image}
              name={skill.skill_name}
              width={skill.width}
              height={skill.height}
              index={i}
              className={(skill as any).className}
            />
          ))}
        </div>
      )}

      {/* Background Video - Only load and play if in view */}
      <div className="w-full h-full absolute">
        <div className="w-full h-full z-[-10] opacity-30 absolute flex items-center justify-center bg-cover">
          {inView && (
            <video
              className="w-full h-auto"
              preload="metadata"
              playsInline
              loop
              muted
              autoPlay
              src="/cards-video.webm"
            />
          )}
        </div>
      </div>
    </section>
  );
};

