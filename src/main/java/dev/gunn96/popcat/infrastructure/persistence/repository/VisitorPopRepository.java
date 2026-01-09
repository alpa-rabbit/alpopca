package dev.gunn96.popcat.infrastructure.persistence.repository;

import dev.gunn96.popcat.infrastructure.persistence.entity.VisitorPopEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VisitorPopRepository extends JpaRepository<VisitorPopEntity, VisitorPopEntity.VisitorPopId> {
    Optional<VisitorPopEntity> findByIpAddressAndRegionCode(String ipAddress, String regionCode);
}
