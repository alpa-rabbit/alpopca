import { useState, useCallback } from 'react';

export function usePop() {
  const [isPopping, setIsPopping] = useState(false);
  const [popCount, setPopCount] = useState(0);

  const handlePop = useCallback(() => {
    setPopCount((prev) => prev + 1);
  }, []);

  const handleStart = useCallback(() => {
    setIsPopping(true);
  }, []);

  const handleEnd = useCallback(() => {
    setIsPopping(false);
  }, []);

  return {
    isPopping,
    popCount,
    handlePop,
    handleStart,
    handleEnd,
  };
}

