import { Certifications } from "@/components/main/certifications";
import { Encryption } from "@/components/main/encryption";
import { Experience } from "@/components/main/experience";
import { Hero } from "@/components/main/hero";
import { Projects } from "@/components/main/projects";
import { Skills } from "@/components/main/skills";
import { Testimonials } from "@/components/main/testimonials";

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
        <Testimonials />
      </div>
    </main>
  );
}
