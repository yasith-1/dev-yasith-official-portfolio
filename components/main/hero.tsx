import { HeroContent } from "@/components/sub/hero-content";

export const Hero = () => {
  return (
    <div className="relative flex flex-col h-full w-full">
      <video
        autoPlay
        muted
        loop
        className="rotate-180 absolute top-[-360px] left-0 w-full h-full object-cover -z-20 opacity-30"
      >
        <source src="/videos/blackhole.webm" type="video/webm" />
      </video>

      {/* Background Gradient Overlays for better contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.1)_0%,transparent_60%)] -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(6,182,212,0.1)_0%,transparent_60%)] -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030014]/50 to-[#030014] -z-10" />

      <HeroContent />
    </div>
  );
};
