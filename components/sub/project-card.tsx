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

  // Update image source if prop changes
  useEffect(() => {
    setImgSrc(src);
    setImgError(false);
  }, [src]);

  const fallbackImage = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop";

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="relative group h-full"
    >
      <Link
        href={link}
        target="_blank"
        rel="noreferrer noopener"
        className="flex flex-col h-full overflow-hidden rounded-[24px] border border-white/5 bg-[#030014]/40 backdrop-blur-2xl transition-all duration-500 group-hover:border-purple-500/50 group-hover:shadow-[0_0_50px_rgba(112,66,248,0.2)]"
      >
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={imgError ? fallbackImage : imgSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImgError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030014] to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        </div>

        <div className="flex flex-col flex-grow p-5">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">
            {title}
          </h2>
          <p className="mt-2 text-gray-400 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors">
            {description}
          </p>

          <div className="mt-auto pt-4 flex items-center gap-2 text-purple-400 font-medium text-sm group-hover:text-purple-300">
            <span>View Project</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
