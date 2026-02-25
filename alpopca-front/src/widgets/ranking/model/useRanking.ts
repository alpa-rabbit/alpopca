import { useQuery } from '@tanstack/react-query';
import { getLeaderboard } from '@/shared/api/leaderboard';
import { qk } from '@/shared/api/queryKeys';

const COUNTRY_NAME_OVERRIDES: Record<string, string> = {
  HK: 'HONG KONG',
  TW: 'TAIWAN',
  KR: 'KOREA',
  US: 'USA',
  GB: 'UK',
};

function getCountryDisplayName(englishName: string, regionCode: string): string {
  const code = regionCode.toUpperCase();
  return (COUNTRY_NAME_OVERRIDES[code] ?? englishName).toUpperCase();
}

export interface RankingItem {
  rank: number;
  country: string;
  countryFlag: string;
  score: number;
}

export function useRanking(userRegionCode?: string | null) {
  const { data, isLoading } = useQuery({
    queryKey: qk.leaderboard(),
    queryFn: getLeaderboard,
    refetchInterval: 30_000,
  });

  const regionRankList = data?.data?.regionRankList ?? [];

  const rankings: RankingItem[] = regionRankList.map((entry, index) => ({
    rank: index + 1,
    country: getCountryDisplayName(entry.englishName, entry.regionCode.name),
    countryFlag: entry.flagEmoji,
    score: entry.popCount,
  }));

  const currentUserRank = userRegionCode
    ? (rankings.find((_, index) => regionRankList[index]?.regionCode.name === userRegionCode) ?? null)
    : null;

  return { rankings, currentUserRank, isLoading };
}
