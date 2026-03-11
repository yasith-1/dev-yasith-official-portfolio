"use client";

import React, { useEffect, useState } from "react";
import { ProjectCard } from "@/components/sub/project-card";
import { PROJECTS, GITHUB_USERNAME, Project } from "@/constants";
import { motion, AnimatePresence } from "framer-motion";
import { RxChevronDown } from "react-icons/rx";
import { getGithubProjects, getCustomSocialPreview } from "@/lib/github";


export const Projects = () => {
  const [allProjects, setAllProjects] = useState<Project[]>(Array.from(PROJECTS));
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const fetchGithubRepos = async () => {
      try {
        const githubRepos = await getGithubProjects();

        // 1. Check all static projects for custom social previews on GitHub
        const updatedStaticProjects = await Promise.all(
          PROJECTS.map(async (project) => {
            if (project.link.includes("github.com/") && 
                project.link.replace(/\/$/, "").split("/").length > 4) {
              
              const customPreview = await getCustomSocialPreview(project.link);
              if (customPreview) {
                return { ...project, image: customPreview };
              }
            }
            return project;
          })
        );

        // 2. Transform and check Dynamic Github repos for custom previews
        const dynamicProjects: Project[] = await Promise.all(
          githubRepos.map(async (repo) => {
            const title = repo.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            
            // Check for custom social preview first to ensure latest is used
            const customPreview = await getCustomSocialPreview(repo.html_url);
            
            return {
              title,
              description: repo.description,
              // Fallback to opengraph proxy ONLY if custom preview isn't found
              image: customPreview || `https://opengraph.githubassets.com/${repo.id}/${GITHUB_USERNAME}/${repo.name}`,
              link: repo.html_url,
            };
          })
        );

        // 3. Merge updated static projects with dynamic ones
        const merged = [...updatedStaticProjects];


        dynamicProjects.forEach(dProj => {
          const isDuplicate = merged.some(sProj =>
            sProj.link.toLowerCase().includes(dProj.link.toLowerCase()) ||
            sProj.title.toLowerCase() === dProj.title.toLowerCase()
          );

          if (!isDuplicate) {
            merged.push(dProj);
          }
        });

        setAllProjects(merged);
      } catch (error) {
        console.error("Failed to fetch Github projects", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubRepos();
  }, []);


  if (!isMounted) return null;

  return (
    <section
      id="projects"
      className="flex flex-col items-center justify-center py-20 z-[20]"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-7xl font-black text-white text-center mb-10 px-4"
      >
        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 bg-[length:200%_auto] animate-[gradient_8s_linear_infinite] drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]">Projects</span>
      </motion.h1>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="h-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-10 max-w-[1400px]"
      >
        <AnimatePresence mode="popLayout">
          {loading ? (
            // Skeleton Loading State
            Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={`skeleton-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-[400px] w-full rounded-[24px] bg-[#030014]/40 border border-white/5 animate-pulse"
              />
            ))
          ) : (
            allProjects.slice(0, showAll ? allProjects.length : 6).map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard
                  src={project.image}
                  title={project.title}
                  description={project.description}
                  link={project.link}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>

      {!loading && allProjects.length > 6 && (
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
                <RxChevronDown className="w-5 h-5 text-cyan-400" />
              </motion.div>
            </span>
          </button>
        </motion.div>
      )}
    </section>
  );
};
