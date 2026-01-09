package dev.gunn96.popcat.infrastructure.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "visitor_clicks")
@NoArgsConstructor
@IdClass(VisitorEntityV2.VisitorEntityId.class)
public class VisitorEntityV2 {
    @Id
    private String ipAddress;

    @Id
    private String regionCode;

    @Column(nullable = false)
    private Long clickCount;

    @Column(nullable = false)
    private LocalDateTime lastActivity;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class VisitorEntityId implements Serializable {
        private String ipAddress;
        private String regionCode;
    }
}
