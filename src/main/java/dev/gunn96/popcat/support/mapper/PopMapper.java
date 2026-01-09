package dev.gunn96.popcat.support.mapper;

import dev.gunn96.popcat.domain.Pop;
import dev.gunn96.popcat.infrastructure.web.dto.PopResponse;
import dev.gunn96.popcat.infrastructure.persistence.entity.RegionPopEntity;
import dev.gunn96.popcat.infrastructure.persistence.entity.VisitorPopEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public class PopMapper {

    public Pop from(VisitorPopEntity entity) {
        return Pop.builder()
                .ipAddress(entity.getIpAddress())
                .regionCode(entity.getRegionCode())
                .count(entity.getCount())
                .build();
    }

    public Pop from(RegionPopEntity entity) {
        return Pop.builder()
                .regionCode(entity.getRegionCode())
                .count(entity.getCount())
                .build();
    }

    public VisitorPopEntity toVisitorEntity(Pop pop) {
        return VisitorPopEntity.builder()
                .ipAddress(pop.getIpAddress())
                .regionCode(pop.getRegionCode())
                .count(pop.getCount())
                .build();
    }

    public RegionPopEntity toRegionEntity(Pop pop) {
        return RegionPopEntity.builder()
                .regionCode(pop.getRegionCode())
                .count(pop.getCount())
                .build();
    }

    public PopResponse toResponse(long countAppend, String newToken, boolean isProcessed) {
        return new PopResponse(countAppend, newToken, isProcessed);
    }
}
