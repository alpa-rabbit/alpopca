package dev.gunn96.popcat.entity;

import jakarta.persistence.Embeddable;

@Embeddable
public class VisitorId {
    private String ipAddress;
    private String regionCode;
}
