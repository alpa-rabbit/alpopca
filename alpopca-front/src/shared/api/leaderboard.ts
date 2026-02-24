import { http } from './http';

export interface LeaderboardEntry {
  rank: number;
  regionCode: string;
  count: number;
}

export type LeaderboardResponse = LeaderboardEntry[];

export async function getLeaderboard(): Promise<LeaderboardResponse> {
  return http.get('api/v1/leaderboard').json<LeaderboardResponse>();
}
