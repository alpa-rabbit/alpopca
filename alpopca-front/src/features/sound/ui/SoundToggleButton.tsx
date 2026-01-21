import { useState } from 'react';
import SoundOnIcon from '@/shared/assets/sound_on.svg';
import SoundOffIcon from '@/shared/assets/sound_off.svg';

export default function SoundToggleButton() {
  const [isSoundOn, setIsSoundOn] = useState(true);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSoundOn((prev) => !prev);
  };

  return (
    <div>
      <button
        onClick={toggleSound}
        className="w-8 h-8 flex items-center justify-center"
      >
        {isSoundOn ? (
          <img src={SoundOnIcon} alt="Sound On" className="w-8 h-8 object-contain" />
        ) : (
          <img src={SoundOffIcon} alt="Sound Off" className="w-8 h-8 object-contain" />
        )}
      </button>
    </div>
  );
}

