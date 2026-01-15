package dev.gunn96.popcat.domain.vo;

public record PopCount(long value) {
    private static final long MAX_PER_REQUEST = 800;

    public PopCount add(long count) {
        if(count < 0) throw new IllegalArgumentException("count는 양수여야 합니다");
        long validCount = Math.min(count, MAX_PER_REQUEST);
        return new PopCount(this.value + validCount);
    }

    public static PopCount of(long value){
        if (value < 0) {
            throw new IllegalArgumentException("count는 양수여야 합니다");
        }
        return new PopCount(value);
    }
}