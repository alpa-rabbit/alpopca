package dev.gunn96.popcat.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.gunn96.popcat.infrastructure.security.jwt.JwtAuthenticationFilter;
import dev.gunn96.popcat.infrastructure.security.jwt.JwtAuthenticationProvider;
import dev.gunn96.popcat.infrastructure.security.jwt.JwtProvider;
import dev.gunn96.popcat.infrastructure.web.CorsProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthenticationProvider jwtAuthenticationProvider;

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter(
            AuthenticationConfiguration authConfig, JwtProvider jwtProvider,
             ObjectMapper objectMapper) throws Exception {
        return new JwtAuthenticationFilter(authConfig.getAuthenticationManager(),
                jwtProvider, objectMapper
        );
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource(CorsProperties corsProperties) {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(corsProperties.allowedOriginPatterns());
        config.setAllowedMethods(corsProperties.allowedMethods());
        config.setAllowedHeaders(corsProperties.allowedHeaders());
        config.setAllowCredentials(true);
        config.setMaxAge(corsProperties.maxAge());

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http,
                                                   JwtAuthenticationProvider jwtAuthenticationProvider,
                                                   JwtAuthenticationFilter jwtAuthenticationFilter, CorsProperties corsProperties) throws Exception {

        return http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(configurer ->
                        configurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/").permitAll()
                        .requestMatchers("/api/v1/auth/token").permitAll()
                        .requestMatchers("/api/v1/leaderboard/**").permitAll()
                        .requestMatchers("/api/v1/pop/**").authenticated()
                        .anyRequest().authenticated()
                )
                .authenticationProvider(jwtAuthenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
//                .securityMatcher("/api/v1/pop/**")
                .build();
    }
}