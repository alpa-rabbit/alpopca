package dev.gunn96.popcat.infrastructure.web.controller;

import dev.gunn96.popcat.infrastructure.security.jwt.JwtProperties;
import dev.gunn96.popcat.infrastructure.security.jwt.JwtProvider;
import dev.gunn96.popcat.infrastructure.web.dto.response.TokenResponse;
import dev.gunn96.popcat.support.ApiResponse;
import dev.gunn96.popcat.support.IpAddressExtractor;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final JwtProperties jwtProperties;

    private final JwtProvider jwtProvider;
    @GetMapping("/token")
    public ApiResponse<?> getToken(HttpServletRequest request){
        String token = jwtProvider.generateToken(IpAddressExtractor.extractIpAddress(request));
        return ApiResponse.success(TokenResponse.of(token,jwtProperties.expirationSeconds()));
    }

}
