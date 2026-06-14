import { useState } from 'react';
import { isSoundEnabled, setSoundEnabled } from '@/shared/lib/sound';
import 'pixelarticons/fonts/pixelart-icons-font.css';

export default function SoundToggleButton() {
  const [soundOn, setSoundOn] = useState<boolean>(isSoundEnabled);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !soundOn;
    setSoundEnabled(next);
    setSoundOn(next);
  };

  return (
    <button
      onClick={toggleSound}
      className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border-2 border-transparent hover:border-black/10 rounded-lg"
      aria-label={soundOn ? 'Mute' : 'Unmute'}
    >
      {soundOn ? (
        <i className="pixelart-icons-font-volume-2 text-3xl md:text-4xl text-black pixel-antialiased drop-shadow-sm"></i>
      ) : (
        <i className="pixelart-icons-font-volume-x text-3xl md:text-4xl text-black/50 pixel-antialiased drop-shadow-sm"></i>
      )}
    </button>
  );
}
