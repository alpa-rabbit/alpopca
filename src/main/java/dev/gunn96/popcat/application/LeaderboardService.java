package dev.gunn96.popcat.application;

import dev.gunn96.popcat.infrastructure.web.dto.response.LeaderboardResponse;

public interface LeaderboardService {
    LeaderboardResponse getLeaderboard();
}
