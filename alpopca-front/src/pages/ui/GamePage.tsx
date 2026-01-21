import PopArea from '@/features/pop/ui/PopArea';
import PopCounter from '@/features/pop/ui/PopCounter';
import { usePop } from '@/features/pop/model/usePop';
import Header from '@/widgets/header/ui/Header';
import Ranking from '@/widgets/ranking/ui/Ranking';

export default function GamePage() {
  const { isPopping, popCount, handlePop, handleStart, handleEnd } = usePop();

  return (
    <div
      className="relative h-screen overflow-hidden bg-transparent cursor-pointer touch-none select-none"
      onClick={handlePop}
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => {
        e.preventDefault();
        handleStart();
      }}
      onTouchEnd={(e) => {
        e.preventDefault();
        handleEnd();
        handlePop();
      }}
      onTouchCancel={(e) => {
        e.preventDefault();
        handleEnd();
      }}
      style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
    >
      <div className="pointer-events-auto relative z-20">
        <Header />
      </div>
      <div className="absolute top-16 md:top-16 left-0 right-0 z-10 pointer-events-none flex justify-center">
        <PopCounter popCount={popCount} />
      </div>
      <div className="w-full h-screen flex items-center justify-center">
        <PopArea isPopping={isPopping} />
      </div>
      <div className="pointer-events-auto relative z-20">
        <Ranking
          rankings={[
            { rank: 1, country: 'THAILAND', countryFlag: '🇹🇭', score: 125404416012 },
            { rank: 2, country: 'HONG KONG', countryFlag: '🇭🇰', score: 123553091341 },
            { rank: 3, country: 'TAIWAN', countryFlag: '🇹🇼', score: 121650047765 },
            { rank: 4, country: 'JAPAN', countryFlag: '🇯🇵', score: 108901570854 },
            { rank: 5, country: 'KOREA', countryFlag: '🇰🇷', score: 30902310534 },
            { rank: 6, country: 'MALAYSIA', countryFlag: '🇲🇾', score: 24310944658 },
            { rank: 7, country: 'SAUDI ARABIA', countryFlag: '🇸🇦', score: 11545777215 },
            { rank: 8, country: 'USA', countryFlag: '🇺🇸', score: 10988649175 },
            { rank: 9, country: 'INDONESIA', countryFlag: '🇮🇩', score: 10221377047 },
            { rank: 10, country: 'FINLAND', countryFlag: '🇫🇮', score: 9349985690 },
          ]}
          currentUserRank={{ rank: 5, country: 'KOREA', countryFlag: '🇰🇷', score: 30902310534 }}
        />
      </div>
    </div>
  );
}

