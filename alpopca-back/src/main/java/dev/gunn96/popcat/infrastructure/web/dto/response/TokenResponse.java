package dev.gunn96.popcat.infrastructure.web.dto.response;

public record TokenResponse(String accessToken,
                            String tokenType,
                            Long expiresIn ) {
    public static TokenResponse of(String token, long expiresInSeconds) {
        return new TokenResponse(token, "Bearer", expiresInSeconds);
    }
}
