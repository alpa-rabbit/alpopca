import SoundToggleButton from '@/features/sound/ui/SoundToggleButton';
import GitIcon from '@/shared/assets/github.svg';

export default function Header() {
  const gitRepoUrl = 'https://github.com/alpa-rabbit/alpopca';

  return (
    <div className='flex items-center justify-between p-4'>
      <h1 className='text-3xl font-bold text-red-500'>Alpopca</h1>
      <div className='flex items-center gap-4'>
        {/* Git */}
        <a href={gitRepoUrl} target='_blank' rel='noopener noreferrer'>
          <img src={GitIcon} alt='GitHub Repository' className='w-8 h-8 object-contain' />
        </a>
        {/* Sound */}
        <SoundToggleButton />
      </div>
    </div>
  );
}
