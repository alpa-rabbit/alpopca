package dev.gunn96.popcat.application.dto;

import dev.gunn96.popcat.domain.vo.PopCount;
import dev.gunn96.popcat.domain.vo.RegionCode;

public record PopCommand(RegionCode regionCode, PopCount popCount) {

}
