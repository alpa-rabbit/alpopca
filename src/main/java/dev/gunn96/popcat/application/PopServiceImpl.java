package dev.gunn96.popcat.application;

import dev.gunn96.popcat.application.dto.PopCommand;
import dev.gunn96.popcat.domain.RegionStats;
import dev.gunn96.popcat.infrastructure.persistence.entity.RegionStatsEntity;
import dev.gunn96.popcat.infrastructure.persistence.mapper.RegionStatsEntityMapper;
import dev.gunn96.popcat.infrastructure.persistence.repository.RegionStatsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class PopServiceImpl implements PopService {
    private final RegionStatsRepository regionStatsRepository;

    @Transactional
    @Override
    public Long addPops(PopCommand popCommand) {
        Optional<RegionStatsEntity> optional = regionStatsRepository
                .findByRegionCode(popCommand.regionCode().name());
        RegionStats regionStats;
        if (optional.isEmpty()) {
            regionStats = createNewRegion(popCommand);
        } else{
            regionStats = RegionStatsEntityMapper.toDomain(optional.get());
            regionStats = regionStats.addCount(popCommand.popCount());
        }

        regionStatsRepository.save(RegionStatsEntityMapper.toEntity(regionStats));

        return popCommand.popCount().value();
    }

    private RegionStats createNewRegion(PopCommand popCommand) {
        RegionStats regionStats;
        regionStats = RegionStats.builder()
                .regionCode(popCommand.regionCode())
                .popCount(popCommand.popCount())
                .build();
        return regionStats;
    }


}
