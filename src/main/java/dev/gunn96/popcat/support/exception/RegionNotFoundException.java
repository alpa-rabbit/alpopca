package dev.gunn96.popcat.support.exception;

import dev.gunn96.popcat.domain.vo.RegionCode;

public class RegionNotFoundException extends RuntimeException {
    public RegionNotFoundException(RegionCode regionCode) {
        super("Region Not Found: " + regionCode.name());
    }
}
