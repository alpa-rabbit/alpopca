package dev.gunn96.popcat.infrastructure.persistence.mapper;


import dev.gunn96.popcat.domain.RegionStats;
import dev.gunn96.popcat.domain.vo.PopCount;
import dev.gunn96.popcat.domain.vo.RegionCode;
import dev.gunn96.popcat.domain.vo.RegionStatsId;
import dev.gunn96.popcat.infrastructure.persistence.entity.RegionStatsEntity;

public class RegionStatsEntityMapper {
    public static RegionStats toDomain(RegionStatsEntity entity) {
        return RegionStats.builder()
                .id(RegionStatsId.of(entity.getId()))
                .regionCode(RegionCode.fromString(entity.getRegionCode()))
                .popCount(PopCount.of(entity.getTotalClicks()))
                .build();
    }

    public static RegionStatsEntity toEntity(RegionStats domain) {
        return RegionStatsEntity.builder()
                .id(domain.getId() != null ? domain.getId().id() : null)
                .regionCode(domain.getRegionCode().name())
                .totalClicks(domain.getPopCount().value())
                .build();
    }
}
