package dev.gunn96.popcat.domain;

import dev.gunn96.popcat.domain.vo.PopCount;
import dev.gunn96.popcat.domain.vo.RegionCode;
import dev.gunn96.popcat.domain.vo.RegionStatsId;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@Builder(toBuilder = true)
public class RegionStats {
    private final RegionStatsId id;
    private final RegionCode regionCode;
    private final PopCount popCount;

    public RegionStats addCount(PopCount popCount) {
        return this.toBuilder()
                .popCount(new PopCount(this.popCount.value() + popCount.value()))
                .build();
    }
}