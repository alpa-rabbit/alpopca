import { useState, useCallback } from 'react';

const STORAGE_KEY = 'alpopca_sound_enabled';

function getSavedEnabled(): boolean {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === null ? true : saved === 'true';
  } catch {
    return true;
  }
}

export function useSoundEnabled() {
  const [enabled, setEnabled] = useState<boolean>(getSavedEnabled);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, String(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  return { enabled, toggle };
}
