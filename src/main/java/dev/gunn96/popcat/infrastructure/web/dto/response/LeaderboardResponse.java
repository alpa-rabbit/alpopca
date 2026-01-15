package dev.gunn96.popcat.infrastructure.web.dto.response;

import dev.gunn96.popcat.domain.RegionStats;
import dev.gunn96.popcat.infrastructure.web.support.RegionPopInfo;
import lombok.Builder;

import java.util.List;

@Builder
public record LeaderboardResponse(long globalSum, List<RegionPopInfo> regionRankList) {
    public static LeaderboardResponse of(long globalSum, List<RegionStats> domainList) {
        return LeaderboardResponse.builder()
                .globalSum(globalSum)
                .regionRankList(domainList.stream().map(RegionPopInfo::of).toList())
                .build();
    }
}
