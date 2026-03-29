import React from 'react';

const awardsData = [
  {
    icon: "🥇",
    title: "On the Spot Team Award",
    company: "Morgan Stanley / TCS",
    desc: "Recognized for exceptional contribution to a team deliverable and building AI-powered developer tools at enterprise scale.",
    color: "#ffd700"
  },
  {
    icon: "🤖",
    title: "TCS Artificial Intelligence Spark",
    company: "TCS",
    desc: "AI excellence recognition. Awarded for generative AI implementation and VS Code extension ecosystem innovations.",
    color: "#00d4ff"
  },
  {
    icon: "⚡",
    title: "Xcelerate Warrior",
    company: "TCS",
    desc: "Top performance band recognition based on T-Factor (3.33) reflecting exceptional delivery speed and accuracy.",
    color: "#ff2d9b"
  },
  {
    icon: "🎓",
    title: "Prathibha Puraskar",
    company: "Govt. of AP",
    desc: "State-level merit award for top marks in 10th grade performance, recognizing academic brilliance.",
    color: "#9b59ff"
  },
  {
    icon: "🏅",
    title: "Certificate of Excellence",
    company: "JNTUCEK",
    desc: "Awarded by Dr. Suneetha Eluri for productive service to the institution's official website.",
    color: "#00ffea"
  }
];

export const Awards: React.FC = () => {
  return (
    <section id="awards" className="relative w-full py-24 bg-[var(--color-deep)] overflow-hidden">
      
      {/* Background Particles Area */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(255, 215, 0, 0.15) 0%, transparent 60%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 mb-12 text-center relative z-10">
        <h2 className="glow-text text-[var(--color-gold)] text-3xl md:text-5xl uppercase mb-4">
          The <span className="text-white">Trophies</span>
        </h2>
      </div>

      {/* Horizontal Scroll Area */}
      <div className="w-full relative z-10 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar pl-6 md:pl-24">
        <div className="flex gap-8 w-max pr-24">
          
          {awardsData.map((award, i) => (
            <div 
              key={i} 
              className="group w-80 h-96 relative snap-center snap-always"
              style={{ perspective: '1000px' }}
            >
              <div 
                className="w-full h-full transition-transform duration-700 relative preserve-3d"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="group-hover:rotate-y-180 absolute inset-0 w-full h-full transition-all duration-700 preserve-3d">
                  
                  {/* FRONT PORTION OF CARD */}
                  <div 
                    className="absolute inset-0 w-full h-full backface-hidden bg-[rgba(10,15,30,0.8)] border-2 rounded-xl flex flex-col items-center justify-center p-8 text-center"
                    style={{ borderColor: 'rgba(255, 215, 0, 0.2)', WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
                  >
                    {/* Inner gold shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[rgba(255,215,0,0.05)] to-transparent pointer-events-none rounded-xl" />
                    
                    <div className="text-6xl mb-6 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">{award.icon}</div>
                    <h3 className="font-display text-xl text-white mb-4 glow-text leading-tight">{award.title}</h3>
                    <div className="font-accent text-sm uppercase tracking-widest" style={{ color: award.color }}>
                      {award.company}
                    </div>
                  </div>

                  {/* BACK PORTION OF CARD */}
                  <div 
                    className="absolute inset-0 w-full h-full bg-[rgba(10,15,30,0.95)] border-2 rounded-xl flex items-center justify-center p-8 text-center rotate-y-180"
                    style={{ 
                      borderColor: award.color, 
                      transform: 'rotateY(180deg)',
                      WebkitBackfaceVisibility: 'hidden',
                      backfaceVisibility: 'hidden',
                      boxShadow: `0 0 30px ${award.color}40, inset 0 0 20px ${award.color}20`
                    }}
                  >
                    <p className="font-body text-[var(--color-text-primary)] leading-relaxed text-sm">
                      "{award.desc}"
                    </p>
                  </div>

                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};
