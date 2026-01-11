package dev.gunn96.popcat.domain;

import dev.gunn96.popcat.domain.vo.PopCount;
import dev.gunn96.popcat.domain.vo.RegionCode;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@Builder
public class RegionStats {
    private final RegionCode regionCode;
    private final PopCount popCount;

    public RegionStats addCount(RegionCode regionCode, PopCount popCount) {
        return null;
    }
}