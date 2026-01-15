package dev.gunn96.popcat.domain.vo;

public record RegionStatsId(Long id) {
    public static RegionStatsId of(Long id){
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("invalid id " + id);
        }
        return new RegionStatsId(id);
    }
}
