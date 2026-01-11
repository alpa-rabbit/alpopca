package dev.gunn96.popcat.domain.vo;

import io.micrometer.common.util.StringUtils;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum RegionCode {
    KR,
    US,
    JP,
    UNKNOWN;

    public static RegionCode fromString(String code) {
        if (code == null || StringUtils.isBlank(code)) {
            return UNKNOWN;
        }
        try {
            return RegionCode.valueOf(code.toUpperCase());
        } catch (IllegalArgumentException e) {
            return UNKNOWN;
        }
    }
}
