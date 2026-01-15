package dev.gunn96.popcat.infrastructure.persistence.repository;

import dev.gunn96.popcat.infrastructure.persistence.entity.RegionStatsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RegionStatsRepository extends JpaRepository<RegionStatsEntity, Long> {
    Optional<RegionStatsEntity> findByRegionCode(String regionCode);

    List<RegionStatsEntity> findAllByOrderByTotalClicksDesc();
}
