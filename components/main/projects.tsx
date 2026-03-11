"use client";

import React, { useEffect, useState } from "react";
import { ProjectCard } from "@/components/sub/project-card";
import { PROJECTS, GITHUB_USERNAME, Project } from "@/constants";
import { motion, AnimatePresence } from "framer-motion";
import { getGithubProjects } from "@/lib/github";

export const Projects = () => {
  const [allProjects, setAllProjects] = useState<Project[]>(Array.from(PROJECTS));
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const fetchGithubRepos = async () => {
      try {
        const githubRepos = await getGithubProjects();

        // Transform Github repos to Project format
        const dynamicProjects: Project[] = githubRepos.map((repo) => ({
          title: repo.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          description: repo.description,
          // opengraph.githubassets.com is a proxy that serves your actual social preview image
          image: `https://opengraph.githubassets.com/${repo.id}/${GITHUB_USERNAME}/${repo.name}`,
          link: repo.html_url,
        }));

        // Merge static projects with dynamic ones
        // If a static project has the same link as a dynamic one, the static one (with better description/image) wins
        const merged = [...PROJECTS];

        dynamicProjects.forEach(dProj => {
          const isDuplicate = merged.some(sProj =>
            sProj.link.toLowerCase().includes(dProj.link.toLowerCase()) ||
            sProj.title.toLowerCase() === dProj.title.toLowerCase()
          );

          if (!isDuplicate) {
            merged.push(dProj);
          }
        });

        // Sort by some criteria if needed, or just keep static first
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
        className="h-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-10 max-w-[1400px]"
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
            allProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
    </section>
  );
};
