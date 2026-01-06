package dev.gunn96.popcat.ddd.visitor;

import lombok.Builder;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Builder
@RequiredArgsConstructor
public class LastActivity {
    private final LocalDateTime timestamp;

    protected LastActivity updateLastActivity(LocalDateTime localDateTime) {
        return LastActivity.builder()
                .timestamp(localDateTime)
                .build();
    }

}
