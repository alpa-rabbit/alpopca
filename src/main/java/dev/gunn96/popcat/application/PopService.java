package dev.gunn96.popcat.application;

import dev.gunn96.popcat.domain.Pop;
import dev.gunn96.popcat.domain.vo.ClickCount;
import dev.gunn96.popcat.domain.vo.RegionCode;

public interface PopService {
    Pop addPops(RegionCode regionCode, ClickCount clickCount);
}
