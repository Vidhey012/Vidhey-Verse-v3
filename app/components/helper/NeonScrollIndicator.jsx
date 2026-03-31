'use client';
import { useEffect } from "react";

const NeonScrollIndicator = () => {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1080px)");

    if (!mediaQuery.matches) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      const scrollHeight = `${(scrollPercent / 100) * 50}vh`;

      // Inject or update the style rule for body::before
      const styleSheet = document.styleSheets[0];

      // Remove any existing ::before rule previously added
      for (let i = 0; i < styleSheet.cssRules.length; i++) {
        if (styleSheet.cssRules[i].selectorText === "body::before") {
          styleSheet.deleteRule(i);
          break;
        }
      }

      styleSheet.insertRule(
        `body::before { height: ${scrollHeight} !important; }`,
        styleSheet.cssRules.length
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Inject the necessary CSS only once
    const mediaQuery = window.matchMedia("(min-width: 1080px)");
    if (!mediaQuery.matches) return;
    const style = document.createElement("style");
    style.innerHTML = `
      * {
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      *::-webkit-scrollbar {
        display: none;
      }
      body {
        margin: 0;
        padding: 0;
        overflow-y: scroll;
        position: relative;
        border : 2px solid #000;
      }
      body::after {
        content: "";
        position: fixed;
        top: 25%;
        right: 30px;
        width: 10px;
        height: 50%;
        background: rgba(255, 255, 255, 0.08);
        border-radius: 10px;
        z-index: 9998;
        pointer-events: none;
      }
      body::before {
        content: "";
        position: fixed;
        top: 25%;
        right: 30px;
        width: 10px;
        height: 0%;
        background: linear-gradient(to bottom, #ff00cc, #00ffff);
        box-shadow:
          0 0 10px #ff00cc,
          0 0 20px #00ffff,
          0 0 40px #ff00cc,
          0 0 80px #00ffff;
        border-radius: 10px;
        z-index: 9999;
        transition: height 0.2s ease-out;
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null; // This component only injects styles and logic
};

export default NeonScrollIndicator;
