package dev.gunn96.popcat.ddd.visitor;

import dev.gunn96.popcat.entity.VisitorId;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Visitor {
    private final VisitorIdentity identity;
    private final ClickCount clickCount;
    private final LastActivity lastActivity;


    // 비즈니스 로직
    public Visitor recordClicks(long count) {
        return new Visitor(
                this.identity,
                this.clickCount.add(count),
                LastActivity.now()
        );
    }

}
