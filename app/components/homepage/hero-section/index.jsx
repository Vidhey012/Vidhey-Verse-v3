// @flow strict
'use client';
import { useRef, useEffect } from "react";
import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsLinkedin, BsPersonVcardFill, BsMedium } from "react-icons/bs";
import { FaFacebook, FaTwitterSquare, } from "react-icons/fa";
import { RiContactsFill } from "react-icons/ri";
import { SiInstagram } from "react-icons/si";
import Typewriter from '@/app/typewriter/Typewriter';
import '@/app/typewriter/Typewriter.css';
import PixelCard from "../../helper/pixel-card";
import AnimationLottie from "../../helper/animation-lottie";
import wave from "@/public/lottie/wave.json";
import DecryptedText from "../../helper/decrypted-text";
import ScrambledText from "../../helper/scrambled-text";
import { useSceneStore } from "../../3d/SceneProvider";

function HeroSection() {
  const designations = ["Full-Stack Developer.", "Machine Learning Engineer.", "Mobile Application Developer.", "Software Development Engineer."];
  const cardRef = useRef(null);
  const mouseNorm = useSceneStore((s) => s.mouseNorm);

  // 3D Tilt effect for the code card
  useEffect(() => {
    if (!cardRef.current) return;
    const x = mouseNorm.x * 10; // Max 10 deg tilt
    const y = mouseNorm.y * 10;
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
  }, [mouseNorm]);

  const socialLinks = [
    { name: 'Github', href: personalData.github, icon: <BsGithub size={28} />, color: '#7849f8' },
    { name: 'LinkedIn', href: personalData.linkedIn, icon: <BsLinkedin size={28} />, color: '#00f0ff' },
    { name: 'Medium', href: `https://medium.com/@${personalData.mediumUsername}`, icon: <BsMedium size={28} />, color: '#ff2d95' },
    { name: 'Instagram', href: personalData.instagram, icon: <SiInstagram size={28} />, color: '#16f2b3' },
  ];

  return (
    <section className="relative flex flex-col justify-between py-12 lg:py-24 min-h-[90vh]">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-[#7849f8]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#ff2d95]/05 blur-[150px] rounded-full pointer-events-none" />

      <div className="grid grid-cols-1 items-center lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1 flex flex-col items-start justify-center">
          
          <div className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#7849f8]/20 bg-[#7849f8]/05 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#16f2b3] animate-pulse shadow-[0_0_8px_#16f2b3]" />
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#16f2b3] uppercase">System Online</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black leading-tight text-white mb-8">
            <span className="flex items-center gap-4 mb-2">
              <span className="text-white/40 font-light text-2xl md:text-4xl">HI, I AM</span>
              <span className="w-12 h-12 md:w-16 md:h-16 opacity-80">
                <AnimationLottie animationPath={wave} />
              </span>
            </span>
            <div className="relative group">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7849f8] via-[#ff2d95] to-[#00f0ff] animate-gradient-x">
                <DecryptedText 
                   text={personalData.nameTitle.toUpperCase()}
                   speed={80}
                   maxIterations={20}
                   sequential={true}
                   revealDirection="center"
                   useOriginalCharsOnly={false}
                />
              </span>
              <div className="absolute -inset-x-4 -inset-y-2 bg-white/5 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>
            <div className="mt-4 text-xl md:text-2xl font-mono tracking-wider text-[#16f2b3]/80">
              <Typewriter texts={designations} speed={40} pause={2500} />
            </div>
          </h1>

          <p className="text-white/60 text-lg md:text-xl max-w-xl mb-12 leading-relaxed font-light">
            Crafting <span className="text-white font-medium italic underline decoration-[#7849f8]/40 underline-offset-4">immersive digital experiences</span> through code, 3D spatial design, and neural networks.
          </p>

          <div className="flex flex-wrap items-center gap-6 mb-12">
            {socialLinks.map((social, idx) => (
              <Link
                key={social.name}
                href={social.href}
                target='_blank'
                className="relative group p-3 glass-panel border-[#7849f8]/10 hover:border-[#7849f8]/40 transition-all duration-500 hover:-translate-y-2"
                style={{ animation: `float 6s ease-in-out infinite ${idx * 0.5}s` }}
              >
                <div className="absolute inset-0 bg-[#7849f8]/10 blur-lg rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 transition-transform duration-500 group-hover:scale-110" style={{ color: social.color }}>
                  {social.icon}
                </div>
              </Link>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5">
            <Link href="#contact" className="w-full sm:w-auto overflow-hidden group">
              <button className="neon-btn-filled w-full font-display py-4 px-10 group-hover:translate-x-1 transition-transform">
                <span>Engage System</span>
                <RiContactsFill size={18} className="group-hover:rotate-12 transition-transform" />
              </button>
            </Link>

            <Link href={personalData.resume} target="_blank" className="w-full sm:w-auto">
              <button className="neon-btn w-full font-display py-4 px-10 border-[#7849f8]/30 hover:border-[#7849f8] group">
                <span className="text-white/70 group-hover:text-white transition-colors">Data Archive</span>
                <BsPersonVcardFill size={18} className="text-[#7849f8] group-hover:animate-bounce" />
              </button>
            </Link>
          </div>

        </div>

        <div className="order-1 lg:order-2 perspective-1000">
          <div 
            ref={cardRef}
            className="transition-transform duration-200 ease-out preserve-3d"
          >
            <PixelCard variant="blue" className="relative p-[1px] bg-gradient-to-br from-[#7849f8]/20 via-transparent to-[#00f0ff]/20 rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-[#0a0e1a] m-[1px] rounded-2xl" />
              
              {/* Scanline effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7849f8]/05 to-transparent h-1/2 w-full animate-[scan-line_4s_linear_infinite] pointer-events-none z-10" />

              <div className="px-6 lg:px-8 py-5 border-b border-[#7849f8]/10 flex items-center justify-between relative z-20">
                <div className="flex flex-row space-x-2">
                  <div className="h-3 w-3 rounded-full bg-[#ff2d95] shadow-[0_0_8px_#ff2d95]" />
                  <div className="h-3 w-3 rounded-full bg-[#ffb800] shadow-[0_0_8px_#ffb800]" />
                  <div className="h-3 w-3 rounded-full bg-[#16f2b3] shadow-[0_0_8px_#16f2b3]" />
                </div>
                <div className="text-[10px] font-mono tracking-widest text-white/30 uppercase">vidhey_core_v3.bin</div>
              </div>

              <div className="relative z-20 overflow-hidden px-6 lg:px-10 py-8 lg:py-12 bg-[#0a0e1a]/80 backdrop-blur-sm">
                <code className="font-mono text-xs md:text-sm lg:text-[13px] leading-relaxed">
                  <div className="mb-2">
                    <span className="mr-2 text-[#ff2d95] italic">const</span>
                    <span className="mr-2 text-white font-bold">architect</span>
                    <span className="mr-2 text-[#7849f8]">=</span>
                    <span className="text-[#00f0ff]">{'{'}</span>
                  </div>
                  <div className="ml-6 lg:ml-10">
                    <span className="mr-2 text-white/70">identity:</span>
                    <span className="text-[#ffb800]">{`'`}Vidhey Bhogadi{`'`}</span>,
                  </div>
                  <div className="ml-6 lg:ml-10">
                    <span className="mr-2 text-white/70">focus:</span>
                    <span className="text-[#ffb800]">{`'`}Scaleable Neural Systems{`'`}</span>,
                  </div>
                  <div className="ml-6 lg:ml-10">
                    <span className="mr-2 text-white/70">loc:</span>
                    <span className="text-[#ffb800]">{`RegularGrid(SpatialVoid)`}</span>,
                  </div>
                  <div className="ml-6 lg:ml-10 mb-4">
                    <span className="mr-2 text-white/70">stack:</span>
                    <span className="text-[#00f0ff]">[</span>
                    <div className="ml-6 flex flex-wrap gap-x-2">
                      <span className="text-[#16f2b3]">{`'Next.js14',`}</span>
                      <span className="text-[#16f2b3]">{`'Three.js',`}</span>
                      <span className="text-[#16f2b3]">{`'PyTorch',`}</span>
                      <span className="text-[#16f2b3]">{`'GSAP'`}</span>
                    </div>
                    <span className="text-[#00f0ff]">]</span>,
                  </div>
                  <div className="ml-6 lg:ml-10 mb-4">
                    <span className="mr-2 text-[#ff2d95]">proc</span>
                    <span className="text-white">initRuntime</span>
                    <span className="text-[#7849f8]">()</span>
                    <span className="text-[#00f0ff]"> {'{'}</span>
                    <div className="ml-6">
                       <span className="text-[#ff2d95]">while</span>
                       <span className="text-white">{'(passion)'}</span>
                       <span className="text-[#00f0ff]"> {'{'}</span>
                       <div className="ml-6 text-white/40">self.build(dreams++);</div>
                       <span className="text-[#00f0ff]">{'}'}</span>
                    </div>
                    <span className="text-[#00f0ff]">{'}'}</span>
                  </div>
                  <div className="text-[#00f0ff]">{'}'}</div>
                </code>
              </div>
              
              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-[#7849f8]/20 to-transparent pointer-events-none" />
            </PixelCard>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
