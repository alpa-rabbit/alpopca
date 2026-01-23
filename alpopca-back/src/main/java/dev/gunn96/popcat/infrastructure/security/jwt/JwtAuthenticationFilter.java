package dev.gunn96.popcat.infrastructure.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.gunn96.popcat.support.ApiResponse;
import dev.gunn96.popcat.support.IpAddressExtractor;
import dev.gunn96.popcat.support.exception.JwtException;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";

    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;
    private final ObjectMapper objectMapper;

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String token = extractBearerTokenThatRemovedPrefix(request);
        String ipAddress = IpAddressExtractor.extractIpAddress(request);

        // Case the token doesn't exist
        if (token == null) {
            filterChain.doFilter(request, response);
            return;
        }

        //Case the token exists
        try {
            JwtAuthenticationToken authRequest = new JwtAuthenticationToken(token, ipAddress);
            Authentication authentication = authenticationManager.authenticate(authRequest);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            filterChain.doFilter(request, response);
        } catch (ExpiredJwtException e) {
            handleExpiredToken(ipAddress, response, "Token Expired");
        } catch (BadCredentialsException e) {
            // JwtAuthenticationProvider에서 던지는 예외
            handleInvalidToken(response, e.getMessage());
        } catch (JwtException e) {
            // JwtProvider에서 던지는 커스텀 예외
            handleInvalidToken(response, e.getMessage());
        } catch (AuthenticationException e) {
            // 기타 Spring Security 인증 예외
            handleInvalidToken(response, "Authentication failed");
        }
    }

    // if the token has expired, publish new token.
    private void handleExpiredToken(String ipAddress, HttpServletResponse response, String message) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        objectMapper.writeValue(response.getWriter(), ApiResponse.error("TOKEN_EXPIRED",message));
    }

    // if thoe token is failed to validate
    private void handleInvalidToken(HttpServletResponse response, String message) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        objectMapper.writeValue(response.getWriter(),
                ApiResponse.error("INVALID_TOKEN", message));
    }

    // removes `Bearer ` prefix
    private String extractBearerTokenThatRemovedPrefix(HttpServletRequest request) {
        String authorizationHeader = request.getHeader(AUTHORIZATION_HEADER);
        if (authorizationHeader != null && authorizationHeader.startsWith(BEARER_PREFIX)) {
            return authorizationHeader.substring(BEARER_PREFIX.length());
        }
        return null;
    }

}