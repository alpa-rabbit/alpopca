import { useEffect } from 'react';
import PopArea from '@/features/pop/ui/PopArea';
import PopCounter from '@/features/pop/ui/PopCounter';
import { usePop } from '@/features/pop/model/usePop';
import Header from '@/widgets/header/ui/Header';
import Ranking from '@/widgets/ranking/ui/Ranking';
import { useRanking } from '@/widgets/ranking/model/useRanking';

export default function GamePage() {
  const { isPopping, popCount, regionCode, handlePop, handleStart, handleEnd } = usePop();
  const { rankings, currentUserRank, isLoading: isRankingLoading, isError: isRankingError, globalSum } = useRanking(regionCode);

  // 키보드 접근성: 스페이스바 / Enter 로 팝
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleStart();
        handlePop();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        handleEnd();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [handleStart, handlePop, handleEnd]);

  return (
    <div
      className="relative h-screen overflow-hidden bg-transparent cursor-pointer touch-none select-none"
      role="button"
      tabIndex={0}
      aria-label="Tap to pop the alpaca"
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
          isError={isRankingError}
          globalSum={globalSum}
        />
      </div>
    </div>
  );
}
