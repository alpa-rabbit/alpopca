package dev.gunn96.popcat.ddd.visitor;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;

class VisitorTest {

    @Test
    @DisplayName("클릭시 정상적으로 클릭 카운트가 증가한다")
    void recordClicks() {
        //given
        Visitor visitor = Visitor.builder()
                .identity(new VisitorIdentity(new IpAddress("127.0.0.1"), RegionCode.KR))
                .lastActivity(new LastActivity(LocalDateTime.of(2025, 7, 15, 11, 26)))
                .clickCount(ClickCount.zero()).build();

        //when
        visitor = visitor.recordClicks(10, LocalDateTime.now());

        //then
        assertThat(visitor.getClickCount().value()).isEqualTo(10);
        Visitor finalVisitor = visitor;
        assertThatThrownBy(() -> finalVisitor.recordClicks(-1, LocalDateTime.now()));

    }

    @Test
    @DisplayName("클릭 카운트가 유효하지 않을시 예외를 던진다")
    void recordThrowsException(){
        //given
        Visitor visitor = Visitor.builder()
                .identity(new VisitorIdentity(new IpAddress("127.0.0.1"), RegionCode.KR))
                .lastActivity(new LastActivity(LocalDateTime.of(2025, 7, 15, 11, 26)))
                .clickCount(ClickCount.zero()).build();

        assertThatThrownBy(() -> visitor.recordClicks(-1, LocalDateTime.now()));
    }
}