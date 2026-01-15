package dev.gunn96.popcat.domain.vo;

public record RegionCode(String name) {
    public RegionCode {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Region regionCode cannot be blank");
        }
    }

    public static RegionCode fromString(String code) {
        if (code == null) {
            throw new IllegalArgumentException("Region code cannot be null");
        }
        return new RegionCode(code.toUpperCase());
    }
}