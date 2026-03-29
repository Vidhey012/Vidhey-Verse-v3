import React from 'react';
import { motion } from 'framer-motion';

const certs = [
  "Google Generative AI Leader",
  "AWS Cloud Computing",
  "Cisco Networking Devices",
  "Cisco Cybersecurity Threat Mgmt",
  "Selenium 4 — Udemy",
  "Data Analytics Essentials",
  "Computer Hardware Basics",
  "Accenture Developer Virtual"
];

export const Certifications: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  };

  return (
    <section id="certifications" className="w-full py-20 bg-[var(--color-void)] relative border-t border-[rgba(0,212,255,0.05)]">
      
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-white text-2xl uppercase tracking-[0.2em]">
            <span className="text-[var(--color-cyber-blue)] opacity-50">{"// "}</span>
            CERTIFICATIONS
          </h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 select-none sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {certs.map((cert, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              className="relative bg-[var(--color-deep)] border border-[rgba(0,212,255,0.2)] rounded p-4 h-24 flex items-center justify-center text-center overflow-hidden group cursor-none"
              whileHover={{ scale: 1.05 }}
              style={{ boxShadow: '0 0 10px rgba(0,212,255,0.05)' }}
            >
              {/* Shimmer sweep */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.15)] to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" 
              />
              
              <div className="absolute top-0 left-0 w-full h-[1px] bg-[var(--color-cyber-blue)] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--color-cyber-blue)] opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <span className="font-accent text-sm text-[var(--color-text-dim)] group-hover:text-white transition-colors relative z-10 leading-snug">
                {cert}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
};
