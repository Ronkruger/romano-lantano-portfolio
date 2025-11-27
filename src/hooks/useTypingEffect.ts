import { useEffect } from 'react';

export const useTypingEffect = (phrases: string[], elementRef: React.RefObject<HTMLSpanElement>) => {
  useEffect(() => {
    if (!elementRef.current) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseBetweenPhrases = 3000;
    const pauseAfterDelete = 1000;

    const typeWriter = () => {
      const element = elementRef.current;
      if (!element) return;

      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        element.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        element.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      let currentTypingSpeed = typingSpeed;
      if (isDeleting) {
        currentTypingSpeed = deletingSpeed;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        currentTypingSpeed = pauseBetweenPhrases;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        currentTypingSpeed = pauseAfterDelete;
      }

      setTimeout(typeWriter, currentTypingSpeed);
    };

    typeWriter();
  }, [phrases, elementRef]);
};
