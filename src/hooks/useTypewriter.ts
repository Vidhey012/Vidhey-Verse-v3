import { useState, useEffect } from 'react';

export const useTypewriter = (texts: string[], typingSpeed = 18, deletingSpeed = 10, holdTime = 2500, startDelay = 0) => {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  useEffect(() => {
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const type = () => {
      const currentFullText = texts[currentTextIndex];

      if (isDeleting) {
        setText(currentFullText.substring(0, currentCharIndex - 1));
        currentCharIndex--;
      } else {
        setText(currentFullText.substring(0, currentCharIndex + 1));
        currentCharIndex++;
      }

      let timeoutDuration = isDeleting ? deletingSpeed : typingSpeed;
      setIsTyping(!isDeleting);

      if (!isDeleting && currentCharIndex === currentFullText.length) {
        timeoutDuration = holdTime;
        isDeleting = true;
        setIsTyping(false);
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % texts.length;
        timeoutDuration = 500;
        setIsTyping(true);
      }

      timeoutId = setTimeout(type, timeoutDuration);
    };

    const initialTimeout = setTimeout(type, startDelay);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(timeoutId);
    };
  }, [texts, typingSpeed, deletingSpeed, holdTime, startDelay]);

  return { text, isTyping };
};
