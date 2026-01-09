package dev.gunn96.popcat.application;

import dev.gunn96.popcat.infrastructure.web.dto.LeaderboardResponse;

public interface LeaderboardService {
    LeaderboardResponse getLeaderboard();
}
