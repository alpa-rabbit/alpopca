import { useState } from 'react';

interface RankingItem {
  rank: number;
  country: string;
  countryFlag: string;
  score: number;
}

interface RankingProps {
  rankings: RankingItem[];
  currentUserRank?: RankingItem;
  isLoading?: boolean;
  isError?: boolean;
  globalSum?: number | null;
}

interface RankingItemProps {
  rank: number;
  country: string;
  countryFlag: string;
  score: number;
  showMedal?: boolean;
}

function RankingItemComponent({ rank, country, countryFlag, score, showMedal }: RankingItemProps) {
  const getMedalIcon = () => {
    if (rank === 1) return '🥇'; // Consider pixel art icons later
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  return (
    <div className='flex items-center justify-between px-4 py-3 bg-white border-b-2 border-dashed border-black/20 hover:bg-black/5 transition-colors'>
      <div className='flex items-center gap-3'>
        {showMedal && getMedalIcon() && <span className='text-xl'>{getMedalIcon()}</span>}
        <span className='text-xs md:text-sm font-bold font-["Press_Start_2P"] text-black'>#{rank}</span>
        <span className='text-xl'>{countryFlag}</span>
        <span className='text-xs md:text-sm font-bold font-["Press_Start_2P"] text-black truncate max-w-[100px] md:max-w-none'>{country}</span>
      </div>
      <div className='flex items-center gap-2'>
        <span className='text-xs md:text-sm font-bold font-["Press_Start_2P"] text-primary'>{score.toLocaleString()}</span>
      </div>
    </div>
  );
}

export default function Ranking({ rankings, currentUserRank, isLoading, isError, globalSum }: RankingProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const topRank = rankings.length > 0 ? rankings[0] : null;

  if (isError) {
    return (
      <div className='fixed bottom-0 left-0 right-0 z-20 pointer-events-none p-4'>
        <div className='relative flex justify-center'>
          <div className='flex flex-col items-center justify-center px-6 py-4 bg-white border-4 border-red-400 shadow-[8px_8px_0px_0px_rgba(239,68,68,0.5)] pointer-events-auto'>
            <span className='text-xs font-bold font-["Press_Start_2P"] text-red-500 text-center leading-relaxed'>⚠ LEADERBOARD OFFLINE</span>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='fixed bottom-0 left-0 right-0 z-20 pointer-events-none p-4'>
        <div className='relative flex justify-center'>
          <div className='flex flex-col items-center justify-center px-6 py-4 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] pointer-events-auto'>
            <span className='text-xs md:text-sm font-bold font-["Press_Start_2P"] text-black/50 text-center leading-relaxed animate-pulse'>LOADING...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!topRank) {
    return (
      <div className='fixed bottom-0 left-0 right-0 z-20 pointer-events-none p-4'>
        <div className='relative flex justify-center'>
          <div className='flex flex-col items-center justify-center px-6 py-4 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] pointer-events-auto animate-bounce'>
            <span className='text-xs md:text-sm font-bold font-["Press_Start_2P"] text-black text-center leading-relaxed'>👆 TAP TO BE #1! 👆</span>
          </div>
        </div>
      </div>
    );
  }

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleExpand();
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleExpand();
  };

  const formatScore = (score: number) => {
    if (score >= 1e9) {
      return `${(score / 1e9).toFixed(1)}B`;
    }
    return score.toLocaleString();
  };

  // 축소 상태: 1등만 한 줄로 표시
  if (!isExpanded) {
    return (
      <div className='fixed bottom-0 left-0 right-0 z-20 pointer-events-none w-full max-w-3xl mx-auto'>
        <div className='relative'>
          <div
            onClick={handleClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            className='flex items-center justify-between px-4 py-3 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] pointer-events-auto cursor-pointer hover:translate-y-1 hover:shadow-none transition-all'
          >
            <div className='flex justify-between gap-3 flex-1 min-w-0'>
              <div className='flex gap-3 md:gap-4 items-center'>
                <span className='text-xl'>🏆</span>
                <span className='text-xs font-bold font-["Press_Start_2P"] text-black'>#{topRank.rank}</span>
                <span className='text-xl'>{topRank.countryFlag}</span>
                <span className='text-xs font-bold font-["Press_Start_2P"] text-primary'>{formatScore(topRank.score)}</span>
              </div>
              <div className='hidden sm:flex gap-2 md:gap-4 items-center'>
                {currentUserRank && (
                  <>
                    <span className='text-sm text-black/50 font-["Press_Start_2P"]'>...</span>
                    <span className='text-xl'>{currentUserRank.countryFlag}</span>
                    <span className='text-xs font-bold font-["Press_Start_2P"] text-black'>{formatScore(currentUserRank.score)}</span>
                  </>
                )}
              </div>
            </div>
            <span className='ml-4 text-sm font-bold font-["Press_Start_2P"] text-black shrink-0'>^</span>
          </div>
        </div>
      </div>
    );
  }

  // 확장 상태: 전체 리더보드
  return (
    <div className='fixed bottom-0 left-0 right-0 z-20 pointer-events-none'>
      <div className='relative'>
        <div className='bg-white border-4 border-b-0 border-black shadow-[0px_-4px_0px_0px_rgba(0,0,0,0.1)] pointer-events-auto'>
          {/* 헤더 */}
          <div
            onClick={handleClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            className='flex items-center justify-between px-4 py-4 border-b-4 border-black cursor-pointer bg-primary/5 hover:bg-primary/10 transition-colors'
          >
            <div className='flex flex-col items-center justify-center gap-1 flex-1'>
              <div className='flex items-center gap-2'>
                <span className='text-xl'>🏆</span>
                <h2 className='text-sm md:text-base font-bold font-["Press_Start_2P"] text-black'>LEADERBOARD</h2>
              </div>
              {globalSum != null && (
                <span className='text-[10px] font-["Press_Start_2P"] text-black/50'>
                  WORLD: {globalSum.toLocaleString()} POPS
                </span>
              )}
            </div>
            <span className='text-sm font-bold font-["Press_Start_2P"] text-black shrink-0'>v</span>
          </div>

          {/* 리스트 */}
          <div
            className='overflow-y-auto max-h-96 [&::-webkit-scrollbar]:hidden'
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            {rankings.map((item) => (
              <RankingItemComponent
                key={item.rank}
                rank={item.rank}
                country={item.country}
                countryFlag={item.countryFlag}
                score={item.score}
                showMedal={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
