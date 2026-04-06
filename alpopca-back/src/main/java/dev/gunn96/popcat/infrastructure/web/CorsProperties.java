package dev.gunn96.popcat.infrastructure.web;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

@ConfigurationProperties(prefix="cors")
public record CorsProperties(
        List<String> allowedOriginPatterns,
        Long maxAge
){

}
