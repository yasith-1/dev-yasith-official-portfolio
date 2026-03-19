"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type ProjectCardProps = {
  src: string;
  title: string;
  description: string;
  link: string;
};

export const ProjectCard = ({
  src,
  title,
  description,
  link,
}: ProjectCardProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [imgError, setImgError] = useState(false);
  const [liveUrl, setLiveUrl] = useState<string | null>(null);

  // Update image source if prop changes
  useEffect(() => {
    setImgSrc(src);
    setImgError(false);
  }, [src]);

  useEffect(() => {
    const fetchGithubHomepage = async () => {
      try {
        if (link && link.includes('github.com')) {
          const urlParts = link.split('/');
          const ownerIndex = urlParts.indexOf('github.com') + 1;
          const owner = urlParts[ownerIndex];
          const repo = urlParts[ownerIndex + 1];
          
          if (owner && repo) {
            const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
            if (res.ok) {
              const data = await res.json();
              if (data.homepage && data.homepage.trim() !== "") {
                const homepageUrl = data.homepage.startsWith('http') ? data.homepage : `https://${data.homepage}`;
                setLiveUrl(homepageUrl);
              }
            }
          }
        }
      } catch (e) {
        console.error("Failed to fetch github info", e);
      }
    };
    
    fetchGithubHomepage();
  }, [link]);

  const fallbackImage = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop";

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="relative group h-full"
    >
      <div className="flex flex-col h-full overflow-hidden rounded-[24px] border border-white/5 bg-[#030014]/40 backdrop-blur-2xl transition-all duration-500 group-hover:border-purple-500/50 group-hover:shadow-[0_0_50px_rgba(112,66,248,0.2)]">
        <Link
          href={link}
          target="_blank"
          rel="noreferrer noopener"
          className="relative aspect-video w-full overflow-hidden block"
        >
          <Image
            src={imgError ? fallbackImage : imgSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImgError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030014] to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />
        </Link>

        <div className="flex flex-col flex-grow p-5 z-10">
          <Link href={link} target="_blank" rel="noreferrer noopener" className="w-fit">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300 hover:opacity-80">
              {title}
            </h2>
          </Link>
          <p className="mt-2 text-gray-400 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors">
            {description}
          </p>

          <div className="mt-auto pt-4 flex flex-wrap items-center gap-6">
            <Link
              href={link}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-2 text-purple-400 font-medium text-sm hover:text-purple-300 transition-colors group/link"
            >
              <span>View Source</span>
              <svg
                className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            {liveUrl && (
              <Link
                href={liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2 text-cyan-400 font-medium text-sm hover:text-cyan-300 transition-colors group/live"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span>View Live</span>
                <svg
                  className="w-4 h-4 transform group-hover/live:translate-x-1 group-hover/live:-translate-y-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
