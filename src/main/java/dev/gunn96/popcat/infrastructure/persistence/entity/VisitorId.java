package dev.gunn96.popcat.infrastructure.persistence.entity;

import jakarta.persistence.Embeddable;

@Embeddable
public class VisitorId {
    private String ipAddress;
    private String regionCode;
}
