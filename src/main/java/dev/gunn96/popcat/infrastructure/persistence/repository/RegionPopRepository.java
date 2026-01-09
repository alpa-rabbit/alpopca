package dev.gunn96.popcat.infrastructure.persistence.repository;

import dev.gunn96.popcat.infrastructure.persistence.entity.RegionPopEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegionPopRepository extends JpaRepository<RegionPopEntity, String> {
}
