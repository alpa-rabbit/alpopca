package dev.gunn96.popcat;

import dev.gunn96.popcat.infrastructure.security.jwt.JwtProperties;
import dev.gunn96.popcat.infrastructure.web.CorsProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({JwtProperties.class, CorsProperties.class})
public class PopcatApplication {

    public static void main(String[] args) {
        SpringApplication.run(PopcatApplication.class, args);
    }

}
