'use client';
import { useState } from "react";
import Link from "next/link";

import { LINKS, NAV_LINKS, SOCIALS } from "@/constants";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full h-[70px] fixed top-0 backdrop-blur-xl bg-[#030014]/50 z-[100] border-b border-white/5 transition-all duration-300">
      <div className="w-full h-full flex items-center justify-between m-auto px-6 md:px-10 lg:px-20 max-w-[1400px] relative">
        {/* Logo + Name */}
        <Link
          href="#about-me"
          className="flex flex-row items-center"
        >
          <div className="flex items-center justify-center p-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm group hover:border-purple-500/50 transition-all">
            <span className="text-xl font-bold tracking-tighter text-white">
              &lt;YP
              <span className="text-purple-500 group-hover:text-cyan-400 transition-colors">/</span>
              &gt;
            </span>
          </div>
          <div className="hidden md:block font-bold ml-3 text-gray-300 hover:text-white transition-colors">
            Yashith Prabhashwara
          </div>
        </Link>

        {/* Web Navbar (Centered) */}
        <div className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-6 bg-[#030014]/50 border border-white/10 px-6 py-2 rounded-full text-gray-300 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              link && link.title && (
                <a
                  key={link.title}
                  href={link.link}
                  className="cursor-pointer hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300"
                >
                  {link.title}
                </a>
              )
            ))}
          </div>
        </div>

        {/* Right Section: Socials + Hamburger */}
        <div className="flex flex-row items-center gap-3">
          {/* Social Icons (Web) */}
          <div className="hidden lg:flex flex-row gap-3">
            {SOCIALS.map(({ link, name, icon: Icon }) => (
              <a
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                key={name}
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300"
              >
                <Icon className="h-4 w-4 text-gray-300 hover:text-white" />
              </a>
            ))}
          </div>

          {/* Hamburger Menu */}
          <button
            className="lg:hidden text-white focus:outline-none p-2 rounded-lg bg-white/5 border border-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-[70px] left-0 w-full h-screen bg-[#030014]/95 backdrop-blur-2xl transition-all duration-500 ease-in-out z-[99] ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {NAV_LINKS.map((link) => (
            link && link.title && (
              <a
                key={link.title}
                href={link.link}
                className="text-lg sm:text-2xl font-bold tracking-widest text-gray-400 hover:text-white transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.title}
              </a>
            )
          ))}
          <a
            href={LINKS.sourceCode}
            target="_blank"
            rel="noreferrer noopener"
            className="text-lg sm:text-2xl font-bold tracking-widest text-gray-400 hover:text-white transition-all"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Source Code
          </a>

          {/* Social Icons (Mobile) */}
          <div className="flex gap-8 mt-10">
            {SOCIALS.map(({ link, name, icon: Icon }) => (
              <a href={link} target="_blank" rel="noreferrer noopener" key={name} className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <Icon className="h-8 w-8 text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};