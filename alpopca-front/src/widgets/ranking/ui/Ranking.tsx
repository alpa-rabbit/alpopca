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
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  return (
    <div className='flex items-center justify-between px-4 py-2 bg-white/90 border-t border-black/10'>
      <div className='flex items-center gap-3'>
        {showMedal && getMedalIcon() && <span className='text-xl'>{getMedalIcon()}</span>}
        <span className='text-sm font-black text-black'>#{rank}</span>
        <span className='text-xl'>{countryFlag}</span>
        <span className='text-sm font-black text-black'>{country}</span>
      </div>
      <div className='flex items-center gap-2'>
        <span className='text-sm font-black text-black'>{score.toLocaleString()}</span>
      </div>
    </div>
  );
}

export default function Ranking({ rankings, currentUserRank }: RankingProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const topRank = rankings.length > 0 ? rankings[0] : null;

  if (!topRank) {
    return (
      <div className='fixed bottom-0 left-0 right-0 z-20 pointer-events-none'>
        <div className='relative'>
          <div className='flex flex-col items-center justify-center gap-1 px-4 py-3 bg-white/90 rounded-t-lg pointer-events-auto'>
            <span className='text-sm font-black text-black'>👆Tap to be the first!👆</span>
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
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand();
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className='flex items-center justify-between px-4 py-2 bg-white/90 rounded-t-lg pointer-events-auto cursor-pointer'
          >
            <div className='flex justify-between gap-3 flex-1 min-w-0'>
              <div className='flex gap-4 items-center'>
                <span className='text-xl'>🏆</span>
                <span className='text-sm font-black text-black'>#{topRank.rank}</span>
                <span className='text-xl'>{topRank.countryFlag}</span>
                <span className='text-sm font-black text-black'>{formatScore(topRank.score)}</span>
              </div>
              <div className='flex gap-4 items-center'>
                {currentUserRank && (
                  <>
                    <span className='text-sm text-black/50'>...</span>
                    <span className='text-xl'>{currentUserRank.countryFlag}</span>
                    <span className='text-sm font-black text-black'>{currentUserRank.score.toLocaleString()}</span>
                  </>
                )}
              </div>
            </div>
            <span className='ml-4 text-2xl font-black text-black shrink-0'>^</span>
          </div>
        </div>
      </div>
    );
  }

  // 확장 상태: 전체 리더보드
  return (
    <div className='fixed bottom-0 left-0 right-0 z-20 pointer-events-none'>
      <div className='relative'>
        <div className='bg-white/90 rounded-t-lg pointer-events-auto'>
          {/* 헤더 */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand();
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className='flex items-center justify-between px-4 py-3 border-b border-black/10 cursor-pointer'
          >
            <div className='flex items-center justify-center gap-2 flex-1'>
              <span className='text-xl'>🏆</span>
              <h2 className='text-lg font-black text-black'>Leaderboard</h2>
            </div>
            <span className='text-2xl font-black text-black shrink-0'>v</span>
          </div>

          {/* 리스트 */}
          <div
            className='overflow-y-auto max-h-96 [&::-webkit-scrollbar]:hidden'
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
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
