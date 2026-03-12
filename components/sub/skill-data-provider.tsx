"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

type SkillDataProviderProps = {
  src: string;
  name: string;
  width: number;
  height: number;
  index: number;
  className?: string;
};

// Defined outside component to avoid re-creation on every render
const imageVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

const ANIMATION_DELAY = 0.07;

export const SkillDataProvider = ({
  src,
  name,
  width,
  height,
  index,
  className,
}: SkillDataProviderProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      variants={imageVariants}
      animate={inView ? "visible" : "hidden"}
      transition={{ delay: index * ANIMATION_DELAY, duration: 0.35 }}
    >
      <Image
        src={`/skills/${src}`}
        width={width}
        height={height}
        alt={name}
        loading="lazy"
        quality={85}
        sizes="(max-width: 640px) 50px, (max-width: 1024px) 60px, 80px"
        className={className}
      />
    </motion.div>
  );
};

