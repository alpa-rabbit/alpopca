package dev.gunn96.popcat.ddd.visitor;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@RequiredArgsConstructor
public class Visitor {
    private final VisitorIdentity identity;
    private final ClickCount clickCount;
    private final LastActivity lastActivity;


    // 비즈니스 로직
    public Visitor recordClicks(long count, LocalDateTime dateTime) {
        return Visitor.builder()
                .identity(identity)
                .clickCount(clickCount.add(count))
                .lastActivity(lastActivity.updateLastActivity(dateTime))
                .build();
    }

}
