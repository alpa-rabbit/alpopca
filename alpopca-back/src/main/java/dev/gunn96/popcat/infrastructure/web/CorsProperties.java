package dev.gunn96.popcat.infrastructure.web;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

@ConfigurationProperties(prefix="cors")
public record CorsProperties(
        @NotNull @NotEmpty List<String> allowedOriginPatterns,
        @Min(0) Long maxAge,
        @NotNull @NotEmpty List<String> allowedMethods,
        @NotNull List<String> allowedHeaders
){

}
