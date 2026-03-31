"use client";

import React, { useState, useEffect, useRef } from 'react';

const Typewriter = ({ texts, speed = 100, pause = 2000, colors = ['#16f2b3', '#fbbf24'] }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const ref = useRef(null);

  // Visibility observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    if (index < texts[textIndex].length) {
      const timeout = setTimeout(() => {
        setDisplayedText(displayedText + texts[textIndex].charAt(index));
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedText('');
        setIndex(0);
        setTextIndex((textIndex + 1) % texts.length);
        setColorIndex((colorIndex + 1) % colors.length);
      }, pause);
      return () => clearTimeout(timeout);
    }
  }, [index, displayedText, textIndex, colorIndex, texts, speed, pause, colors, isVisible]);

  return (
    <span ref={ref} style={{ color: colors[colorIndex] }}>
      {displayedText}
      <span className="blinking-cursor">|</span>
    </span>
  );
};

export default Typewriter;
