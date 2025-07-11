package dev.gunn96.popcat.ddd.visitor;

public record ClickCount(long value) {
    private static final long MAX_PER_REQUEST = 800;

    public static ClickCount zero() {
        return new ClickCount(0);
    }

    public ClickCount add(long count) {
        long validCount = Math.min(count, MAX_PER_REQUEST);
        return new ClickCount(this.value + validCount);
    }
}