import SoundToggleButton from '@/features/sound/ui/SoundToggleButton';
import 'pixelarticons/fonts/pixelart-icons-font.css';

export default function Header() {
  const gitRepoUrl = 'https://github.com/alpa-rabbit/alpopca';

  return (
    <div className='flex items-center justify-between p-4 bg-background/80 backdrop-blur-sm border-b-4 border-black'>
      <h1 className='text-xl md:text-3xl font-bold text-black font-["Press_Start_2P"] tracking-tighter drop-shadow-sm select-none'>
        Alpopca
      </h1>
      <div className='flex items-center gap-4'>
        {/* Git */}
        <a
          href={gitRepoUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='w-10 h-10 md:w-12 md:h-12 flex items-center justify-center hover:scale-110 transition-transform duration-200 border-2 border-transparent hover:border-black/10 rounded-lg active:scale-95'
        >
          <i className="pixelart-icons-font-github text-3xl md:text-4xl text-black pixel-antialiased drop-shadow-sm"></i>
        </a>
        {/* Sound */}
        <div className='hover:scale-110 transition-transform duration-200 active:scale-95'>
          <SoundToggleButton />
        </div>
      </div>
    </div>
  );
}
