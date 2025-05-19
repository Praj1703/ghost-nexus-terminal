
import { useEffect, useState } from 'react';

interface TypeWriterProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
}

const TypeWriter = ({ 
  text, 
  speed = 50, 
  delay = 0,
  onComplete,
  className = ""
}: TypeWriterProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    // Initial delay before typing starts
    const delayTimer = setTimeout(() => {
      setStartTyping(true);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [delay]);

  useEffect(() => {
    if (!startTyping) return;

    if (currentIndex < text.length) {
      const typingTimer = setTimeout(() => {
        setDisplayText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, speed);

      return () => clearTimeout(typingTimer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, startTyping, onComplete]);

  return (
    <span className={`${className}`}>
      {displayText}<span className={`${currentIndex === text.length ? 'cursor' : ''}`}></span>
    </span>
  );
};

export default TypeWriter;
