package dev.gunn96.popcat.application;

import dev.gunn96.popcat.domain.RegionStats;
import dev.gunn96.popcat.infrastructure.persistence.entity.RegionStatsEntity;
import dev.gunn96.popcat.infrastructure.persistence.repository.RegionStatsRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.groups.Tuple.tuple;
import static org.mockito.BDDMockito.given;


@ExtendWith(MockitoExtension.class)
class LeaderboardServiceImplTest {
    @Mock
    private RegionStatsRepository regionStatsRepository;

    @InjectMocks
    private LeaderboardServiceImpl leaderboardService;

        @Test
        @DisplayName("리더보드 조회 시 정렬된 리더보드를 반환한다")
        void getLeaderboard() {
            List<RegionStatsEntity> unsortedRegionStatList = List.of(
                    createRegionStat(1L,"KR", 100L),
                    createRegionStat(2L,"US", 500L),
                    createRegionStat(3L, "JP", 200L),
                    createRegionStat(4L,"FR", 5000L)
            );

            given(regionStatsRepository.findAll()).willReturn(unsortedRegionStatList);
            List<RegionStats> sortedRegionList = leaderboardService.getLeaderboard();

            assertThat(sortedRegionList).extracting(
                            stats -> stats.getRegionCode().name(),
                            stats -> stats.getPopCount().value()
                    )
                    .containsExactly(
                            tuple("FR", 5000L),
                            tuple("US",500L),
                            tuple("JP", 200L),
                            tuple("KR", 100L));

        }

        private RegionStatsEntity createRegionStat(Long id, String region, Long totalClicks){
            return RegionStatsEntity.builder().id(id).regionCode(region).totalClicks(totalClicks).build();
        }
    }