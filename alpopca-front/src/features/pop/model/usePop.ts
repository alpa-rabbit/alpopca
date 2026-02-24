import { useState, useCallback, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendPop } from '@/shared/api/pop';
import { qk } from '@/shared/api/queryKeys';

export function usePop() {
  const [isPopping, setIsPopping] = useState(false);
  const [popCount, setPopCount] = useState(0);
  const [regionCode, setRegionCode] = useState<string | null>(null);
  const pendingCount = useRef(0);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: sendPop,
    onSuccess: (data) => {
      if (data.regionCode) {
        setRegionCode(data.regionCode);
      }
      void queryClient.invalidateQueries({ queryKey: qk.leaderboard() });
    },
  });

  const flushPops = useCallback(() => {
    if (pendingCount.current > 0) {
      mutate(pendingCount.current);
      pendingCount.current = 0;
    }
  }, [mutate]);

  const handlePop = useCallback(() => {
    setPopCount((prev) => prev + 1);
    pendingCount.current += 1;

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(flushPops, 500);
  }, [flushPops]);

  const handleStart = useCallback(() => {
    setIsPopping(true);
  }, []);

  const handleEnd = useCallback(() => {
    setIsPopping(false);
  }, []);

  return {
    isPopping,
    popCount,
    regionCode,
    handlePop,
    handleStart,
    handleEnd,
  };
}
