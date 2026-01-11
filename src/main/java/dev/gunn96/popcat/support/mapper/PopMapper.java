package dev.gunn96.popcat.support.mapper;

import dev.gunn96.popcat.domain.RegionStats;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public class PopMapper {

    @Mapping()
    public RegionStats from()
}
