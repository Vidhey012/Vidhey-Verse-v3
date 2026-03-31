'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

const ScrambledText = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = ".:",
  className = "",
  style = {},
  children,
}) => {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;

    // Split into words, not chars
    const split = new SplitText(rootRef.current.querySelector("p"), {
      type: "words",
      wordsClass: "inline-block will-change-transform",
    });

    // Store the original word in data-content
    split.words.forEach((word) => {
      gsap.set(word, { attr: { "data-content": word.innerHTML } });
    });

    const handlePointerMove = (e) => {
      const pointerX = e.clientX;
      const pointerY = e.clientY;

      split.words.forEach((word) => {
        const rect = word.getBoundingClientRect();
        const wordCenterX = rect.left + rect.width / 2;
        const wordCenterY = rect.top + rect.height / 2;

        const distance = Math.hypot(pointerX - wordCenterX, pointerY - wordCenterY);

        if (distance <= radius) {
          gsap.to(word, {
            overwrite: true,
            duration: duration * (1 - distance / radius),
            scrambleText: {
              text: word.dataset.content || "",
              chars: scrambleChars,
              speed,
            },
            ease: "none",
          });
        }
      });
    };

    const el = rootRef.current;
    el.addEventListener("pointermove", handlePointerMove);

    return () => {
      el.removeEventListener("pointermove", handlePointerMove);
      split.revert();
    };
  }, [radius, duration, speed, scrambleChars]);

  return (
    <div
      ref={rootRef}
      className={`font-mono text-gray-200 text-lg lg:text-2xl ${className}`}
      style={style}
    >
      <p>{children}</p>
    </div>
  );
};

export default ScrambledText;
