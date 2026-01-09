package dev.gunn96.popcat.domain.vo;

import dev.gunn96.popcat.domain.ValidIpAddress;

public record IpAddress(
        @ValidIpAddress
        String value
) {}