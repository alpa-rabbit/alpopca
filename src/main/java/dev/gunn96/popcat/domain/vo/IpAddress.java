package dev.gunn96.popcat.domain.vo;

import dev.gunn96.popcat.support.ValidIpAddress;

public record IpAddress(
        @ValidIpAddress
        String value
) {}