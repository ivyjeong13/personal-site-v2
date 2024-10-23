import { useEffect, useState } from 'react';

const useCounter = (value: number | undefined) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (value == null || value === 0) {
        clearInterval(interval);
        return;
      }

      setCount((prevCount) => {
        if (prevCount + 1 === value) {
          clearInterval(interval);
        }
        return prevCount + 1;
      });
    }, 5);

    return () => clearInterval(interval);
  }, [value]);

  return { count };
};

export default useCounter;
