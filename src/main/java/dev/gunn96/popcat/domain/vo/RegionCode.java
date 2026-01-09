package dev.gunn96.popcat.domain.vo;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum RegionCode {
    KR("KR"),
    UNKNOWN("UNKNOWN");

    final String code;
}
