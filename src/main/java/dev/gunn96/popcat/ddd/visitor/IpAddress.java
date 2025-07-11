package dev.gunn96.popcat.ddd.visitor;

public record IpAddress(
        @ValidIpAddress
        String value
) {}