import { Hero } from "@/components/main/hero";
import dynamic from "next/dynamic";

const Certifications = dynamic(() => import("@/components/main/certifications").then(mod => mod.Certifications));
const Encryption = dynamic(() => import("@/components/main/encryption").then(mod => mod.Encryption));
const Experience = dynamic(() => import("@/components/main/experience").then(mod => mod.Experience));
const Projects = dynamic(() => import("@/components/main/projects").then(mod => mod.Projects));
const GithubContribution = dynamic(() => import("@/components/main/github-contribution").then(mod => mod.GithubContribution));
const Skills = dynamic(() => import("@/components/main/skills").then(mod => mod.Skills));
const Testimonials = dynamic(() => import("@/components/main/testimonials").then(mod => mod.Testimonials));

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <Skills />
        <Experience />
        <Encryption />
        <Projects />
        <Certifications />
        <GithubContribution />
        <Testimonials />
      </div>
    </main>
  );
}
