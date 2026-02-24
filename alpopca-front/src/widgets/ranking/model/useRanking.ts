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

function getCountryName(regionCode: string): string {
  const code = regionCode.toUpperCase();
  if (code in COUNTRY_NAME_OVERRIDES) {
    return COUNTRY_NAME_OVERRIDES[code];
  }
  try {
    const names = new Intl.DisplayNames(['en'], { type: 'region' });
    return (names.of(code) ?? code).toUpperCase();
  } catch {
    return code;
  }
}

function getCountryFlag(regionCode: string): string {
  return Array.from(regionCode.toUpperCase())
    .map((char) => String.fromCodePoint(0x1f1e6 + char.charCodeAt(0) - 65))
    .join('');
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

  const rankings: RankingItem[] = (data ?? []).map((entry, index) => ({
    rank: entry.rank ?? index + 1,
    country: getCountryName(entry.regionCode),
    countryFlag: getCountryFlag(entry.regionCode),
    score: entry.count,
  }));

  const currentUserRank = userRegionCode
    ? (rankings.find((r) => r.country === getCountryName(userRegionCode)) ?? null)
    : null;

  return { rankings, currentUserRank, isLoading };
}
