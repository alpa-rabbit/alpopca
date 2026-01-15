package dev.gunn96.popcat.infrastructure.web;

import dev.gunn96.popcat.application.LeaderboardService;
import dev.gunn96.popcat.domain.RegionStats;
import dev.gunn96.popcat.infrastructure.web.dto.response.LeaderboardResponse;
import dev.gunn96.popcat.support.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/v1/leaderboard")
@RequiredArgsConstructor
public class LeaderboardController {
    private final LeaderboardService leaderboardService;

    @GetMapping
    public ApiResponse<LeaderboardResponse> getLeaderboard() {
        log.info("Get leaderboard");
        List<RegionStats> sortedRegionList = leaderboardService.getLeaderboard();
        Long globalSum = leaderboardService.calculateGlobalSum(sortedRegionList);

        return ApiResponse.success(LeaderboardResponse.of(globalSum, sortedRegionList));
    }

}
