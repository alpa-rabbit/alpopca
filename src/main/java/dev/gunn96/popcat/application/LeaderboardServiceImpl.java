package dev.gunn96.popcat.application;

import dev.gunn96.popcat.infrastructure.web.dto.LeaderboardResponse;
import dev.gunn96.popcat.infrastructure.web.dto.RegionPopResponse;
import dev.gunn96.popcat.infrastructure.persistence.entity.RegionPopEntity;
import dev.gunn96.popcat.infrastructure.persistence.repository.RegionPopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LeaderboardServiceImpl implements LeaderboardService {
    private final RegionPopRepository regionPopRepository;

    @Override
    public LeaderboardResponse getLeaderboard() {
        List<RegionPopEntity> regionPops = regionPopRepository.findAll();
        return createLeaderboardResponse(regionPops);
    }

    private LeaderboardResponse createLeaderboardResponse(List<RegionPopEntity> regionPops) {
        return LeaderboardResponse.builder()
                .globalSum(calculateGlobalSum(regionPops))
                .rankingList(createSortedRankingList(regionPops))
                .build();
    }

    private long calculateGlobalSum(List<RegionPopEntity> regionPops) {
        return regionPops.stream().mapToLong(RegionPopEntity::getCount).sum();
    }

    private List<RegionPopResponse> createSortedRankingList(List<RegionPopEntity> regionPops) {
        return regionPops.stream().map(entity -> RegionPopResponse.builder()
                        .regionCode(entity.getRegionCode())
                        .count(entity.getCount())
                        .build())
                .sorted(Comparator.comparingLong(RegionPopResponse::getCount).reversed())
                .collect(Collectors.toList());
    }
}
