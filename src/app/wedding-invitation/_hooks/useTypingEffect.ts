import { useState, useEffect, useCallback, useRef } from 'react';

export const useTypingEffect = (
  text: string,
  speed: number = 30,
  shouldStart: boolean = true,
) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  const skip = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setDisplayedText(text);
    setIsComplete(true);
    setIsPlaying(false);
  }, [text]);

  useEffect(() => {
    if (!shouldStart) return;

    let currentIndex = 0;
    setIsPlaying(true);
    intervalRef.current = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setIsComplete(true);
        setIsPlaying(false);
      }
    }, speed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setIsPlaying(false);
    };
  }, [text, speed, shouldStart]);

  return { displayedText, isComplete, skip, isPlaying };
};
