package dev.gunn96.popcat.application;

import dev.gunn96.popcat.domain.RegionStats;

import java.util.List;

public interface LeaderboardService {
    List<RegionStats> getLeaderboard();

    Long calculateGlobalSum(List<RegionStats> sortedRegionList);
}
