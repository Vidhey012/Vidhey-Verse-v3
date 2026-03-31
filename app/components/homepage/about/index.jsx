// @flow strict
'use client';
import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import ProfileCard from "../../helper/profile-card";
import DecryptedText from "../../helper/decrypted-text";
import ScrambledText from "../../helper/scrambled-text";
import AnimationLottie from "../../helper/animation-lottie";
import thinkingLottie from "@/public/lottie/thinking.json";

function AboutSection() {
  return (
    <section id="about" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Section Accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7849f8]/03 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          <div className="order-2 lg:order-1 relative">
            <div className="flex items-center gap-3 mb-8">
               <div className="w-12 h-12 bg-[#7849f8]/10 rounded-xl flex items-center justify-center border border-[#7849f8]/20 shadow-[0_0_15px_rgba(120,73,248,0.1)]">
                 <AnimationLottie animationPath={thinkingLottie} />
               </div>
               <h2 className="font-display text-2xl md:text-4xl font-bold text-white tracking-wider">
                 <ScrambledText text="IDENTITY_CORE" speed={0.5} revealDuration={1} />
               </h2>
            </div>

            <div className="glass-panel p-8 md:p-10 border-[#7849f8]/10 bg-[#0a0e1a]/40 backdrop-blur-md relative group">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#7849f8] to-[#ff2d95] opacity-50" />
              
              <div className="text-white/80 text-lg md:text-xl leading-relaxed font-light space-y-6">
                <DecryptedText 
                  text={personalData.description}
                  speed={40}
                  maxIterations={15}
                  sequential={true}
                  revealDirection="start"
                  className="inline"
                />
              </div>

              {/* Decorative Corner */}
              <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-[#7849f8]/40" />
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              {['ENTHUSIASTIC', 'PROACTIVE', 'PROBLEM_SOLVER', 'ML_DRIVEN'].map((tag, idx) => (
                <div key={idx} className="px-4 py-2 bg-[#7849f8]/05 border border-[#7849f8]/10 rounded-full text-[10px] font-mono tracking-[0.2em] text-[#7849f8] hover:border-[#7849f8]/40 transition-colors">
                   {tag}
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Outer Glow Ring */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#7849f8]/20 via-[#ff2d95]/20 to-[#00f0ff]/20 blur-2xl rounded-[40px] opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="relative z-10 scale-95 lg:scale-100 group-hover:scale-105 transition-transform duration-500">
                <ProfileCard
                  name="Vidhey Bhogadi"
                  title="Software Development Engineer"
                  handle="vidhey012"
                  status="System Online"
                  contactText="Neural Link"
                  avatarUrl="/profile-card/profile.png"
                  showUserInfo={true}
                  enableTilt={true}
                  onContactClick={() => window.open("https://github.com/Vidhey012")}
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Side Label */}
      <div className="hidden xl:flex flex-col items-center absolute top-1/2 -right-12 -translate-y-1/2 rotate-90">
        <span className="font-display text-[10px] tracking-[0.5em] text-[#7849f8]/40 uppercase mb-4">
          Data Seg_001 // Profile
        </span>
        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#7849f8]/30 to-transparent" />
      </div>
    </section>
  );
}

export default AboutSection;