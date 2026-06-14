import { http } from './http';

export interface RegionRankItem {
  regionCode: { name: string };
  englishName: string;
  koreanName: string;
  flagEmoji: string;
  popCount: number;
}

export interface LeaderboardData {
  globalSum: number;
  regionRankList: RegionRankItem[];
}

export interface LeaderboardResponse {
  success: boolean;
  data: LeaderboardData;
  timestamp: string;
}

export async function getLeaderboard(): Promise<LeaderboardResponse> {
  return http.get('api/v1/leaderboard').json<LeaderboardResponse>();
}
