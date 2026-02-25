import PopArea from '@/features/pop/ui/PopArea';
import PopCounter from '@/features/pop/ui/PopCounter';
import { usePop } from '@/features/pop/model/usePop';
import Header from '@/widgets/header/ui/Header';
import Ranking from '@/widgets/ranking/ui/Ranking';
import { useRanking } from '@/widgets/ranking/model/useRanking';

export default function GamePage() {
  const { isPopping, popCount, regionCode, handlePop, handleStart, handleEnd } = usePop();
  const { rankings, currentUserRank, isLoading: isRankingLoading } = useRanking(regionCode);

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
          rankings={rankings}
          currentUserRank={currentUserRank ?? undefined}
          isLoading={isRankingLoading}
        />
      </div>
    </div>
  );
}
