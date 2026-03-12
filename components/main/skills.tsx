"use client";

import { SkillDataProvider } from "@/components/sub/skill-data-provider";
import { SkillText } from "@/components/sub/skill-text";
import { motion } from "framer-motion";
import React, { useState } from "react";

import {
  BACKEND_SKILL,
  FRONTEND_SKILL,
  FULLSTACK_SKILL,
  OTHER_SKILL,
  TOOLS,
} from "@/constants";

export const Skills = () => {
  const [activeTab, setActiveTab] = useState("languages");

  return (
    <section
      id="skills"
      className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden py-10 md:py-20"
    >
      <SkillText />

      <div className="flex flex-row gap-4 mb-4 z-[20] mt-4">
        <button
          onClick={() => setActiveTab("languages")}
          className={`px-6 py-2 rounded-xl border border-[#7042f88b] transition-all duration-300 ${
            activeTab === "languages"
              ? "bg-purple-500 text-white"
              : "text-gray-200 hover:bg-[#7042f83b]"
          }`}
        >
          Languages
        </button>
        <button
          onClick={() => setActiveTab("tools")}
          className={`px-6 py-2 rounded-xl border border-[#7042f88b] transition-all duration-300 ${
            activeTab === "tools"
              ? "bg-purple-500 text-white"
              : "text-gray-200 hover:bg-[#7042f83b]"
          }`}
        >
          Tools
        </button>
      </div>

      {activeTab === "languages" && (
        <>
          <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
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
          <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
            {BACKEND_SKILL.map((skill, i) => (
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
          <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
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
          <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
            {OTHER_SKILL.map((skill, i) => (
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
        </>
      )}

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

      <div className="w-full h-full absolute">
        <div className="w-full h-full z-[-10] opacity-30 absolute flex items-center justify-center bg-cover">
          <video
            className="w-full h-auto"
            preload="false"
            playsInline
            loop
            muted
            autoPlay
            src="/cards-video.webm"
          />
        </div>
      </div>
    </section>
  );
};
