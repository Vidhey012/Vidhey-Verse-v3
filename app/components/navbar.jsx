// @flow strict
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSceneStore } from "./3d/SceneProvider";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollProgress = useSceneStore((s) => s.scrollProgress);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navLinks = [
    { name: "ABOUT", href: "/#about", icon: "🔍" },
    { name: "EXPERIENCE", href: "/#experience", icon: "💼" },
    { name: "SKILLS", href: "/#skills", icon: "🧠" },
    { name: "PROJECTS", href: "/#projects", icon: "💡" },
    { name: "GIT STATS", href: "/#git-stats", icon: "📊" },
    { name: "EDUCATION", href: "/#education", icon: "🎓" },
    { name: "CERTIFICATIONS", href: "/blog", icon: "📜" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 sm:px-12 py-4 ${
      isScrolled 
        ? "bg-[#0a0e1a]/70 backdrop-blur-xl border-b border-[#7849f8]/20 py-3 shadow-[0_10px_30px_-10px_rgba(120,73,248,0.3)]" 
        : "bg-transparent py-5"
    }`}>
      <div className="flex items-center justify-between max-w-[92rem] mx-auto w-full">
        <div className="flex flex-shrink-0 items-center">
          <Link
            href="/"
            className="flex items-center group relative"
          >
            <div className="absolute -inset-2 bg-[#7849f8]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img 
              src="logo.png" 
              alt="Logo" 
              className="h-8 md:h-12 relative transition-transform duration-500 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" style={{ backgroundSize: '200% 100%' }} />
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-1 glass-panel px-2 py-1 border-[#7849f8]/10 bg-[#0a0e1a]/30 backdrop-blur-md">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              className="px-4 py-2 text-[11px] font-display tracking-[0.2em] text-white/70 hover:text-[#7849f8] transition-all duration-300 relative group overflow-hidden" 
              href={link.href}
            >
              <span className="relative z-10">{link.name}</span>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#7849f8] group-hover:w-full transition-all duration-300 shadow-[0_0_8px_#7849f8]" />
            </Link>
          ))}
        </div>

        <button
          className="block md:hidden glass-panel p-2 border-[#7849f8]/30 text-[#7849f8] hover:bg-[#7849f8]/10 transition-colors"
          onClick={toggleMenu}
        >
          <span className="text-xl">☰</span>
        </button>
      </div>

      {/* Mobile Menu Backdrop */}
      {menuOpen && (
        <div className="fixed inset-0 z-[101] bg-[#0a0e1a]/95 backdrop-blur-2xl flex flex-col items-center justify-center animate-in fade-in duration-500">
          <button
            className="absolute top-8 right-8 w-12 h-12 rounded-full border border-[#7849f8]/30 flex items-center justify-center text-[#ff2d95] text-3xl hover:bg-[#7849f8]/10 transition-all font-light"
            onClick={toggleMenu}
          >
            &times;
          </button>
          
          <div className="flex flex-col items-center space-y-6 w-full px-12">
            {navLinks.map((link, idx) => (
              <Link
                key={link.name}
                className="w-full max-w-sm group"
                href={link.href}
                onClick={closeMenu}
              >
                <div 
                  className="glass-card flex items-center justify-between p-5 border-[#7849f8]/20 group-hover:border-[#7849f8]/60 transition-all group-hover:translate-x-2"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <span className="text-xl font-display tracking-[0.1em] text-white/90 group-hover:text-[#7849f8] transition-colors">
                    {link.name}
                  </span>
                  <span className="text-2xl group-hover:scale-125 transition-transform">
                    {link.icon}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="absolute bottom-12 text-[#7849f8]/40 font-mono text-[10px] tracking-widest uppercase">
            Vidhey Verse Systems v3.0
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
