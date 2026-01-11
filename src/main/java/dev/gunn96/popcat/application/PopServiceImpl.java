package dev.gunn96.popcat.application;

import dev.gunn96.popcat.application.dto.PopCommand;
import dev.gunn96.popcat.domain.RegionStats;
import dev.gunn96.popcat.infrastructure.persistence.entity.RegionStatsEntity;
import dev.gunn96.popcat.infrastructure.persistence.repository.RegionStatsRepository;
import dev.gunn96.popcat.support.exception.RegionNotFoundException;
import dev.gunn96.popcat.support.mapper.PopMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class PopServiceImpl implements PopService {
    private final PopMapper popMapper;
    private final RegionStatsRepository regionStatsRepository;

    @Value("${popcat.max-pops-append-per-visitor:800}")
    private long maxPopsAppendPerVisitor;

    @Transactional
    @Override
    public RegionStats addPops(PopCommand popCommand) {
        //엔티티 조회
        RegionStatsEntity entity = regionStatsRepository
                .findByRegionCode(popCommand.regionCode().name())
                .orElseThrow(() -> new RegionNotFoundException(popCommand.regionCode()));

        // 매핑

        // 도메인 로직 실행

        // 저장

        //결과 반환
        return null;
    }


}
