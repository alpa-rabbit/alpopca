package dev.gunn96.popcat.domain;

import dev.gunn96.popcat.domain.vo.ClickCount;
import dev.gunn96.popcat.domain.vo.RegionCode;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@Builder
public class Pop {
    private final RegionCode regionCode;
    private final ClickCount clickCount;

    public Pop addCount(RegionCode regionCode, ClickCount clickCount) {
        return null;
    }
}