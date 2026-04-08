package dev.gunn96.popcat.application;

import dev.gunn96.popcat.domain.RegionStats;
import dev.gunn96.popcat.infrastructure.persistence.mapper.RegionStatsEntityMapper;
import dev.gunn96.popcat.infrastructure.persistence.repository.RegionStatsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LeaderboardServiceImpl implements LeaderboardService {
    private final RegionStatsRepository regionStatsRepository;

    @Override
    public List<RegionStats> getLeaderboard() {
        return regionStatsRepository.findAllByOrderByTotalClicksDesc()
                .stream().map(RegionStatsEntityMapper::toDomain).toList();
    }

    public Long calculateGlobalSum(List<RegionStats> allRegionStatList) {
        return allRegionStatList.stream()
                .mapToLong(regionStats -> regionStats.getPopCount().value())
                .sum();
    }

}
