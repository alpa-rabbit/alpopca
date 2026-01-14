package dev.gunn96.popcat.infrastructure.web;

import dev.gunn96.popcat.application.PopService;
import dev.gunn96.popcat.application.dto.PopCommand;
import dev.gunn96.popcat.infrastructure.geoip.GeoIpService;
import dev.gunn96.popcat.infrastructure.security.jwt.JwtAuthenticationToken;
import dev.gunn96.popcat.infrastructure.security.jwt.JwtProvider;
import dev.gunn96.popcat.infrastructure.security.jwt.TokenClaims;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(PopController.class)
public class PopControllerTest {

    @Autowired
    private MockMvc mockmvc;

    @MockitoBean
    private PopService popService;

    @MockitoBean
    private GeoIpService geoIpService;

    @MockitoBean
    private JwtProvider jwtProvider;

    final static String VALID_REGION_CODE = "KR";
    final static String VALID_IP= "121.254.178.252";

    @Test
    @DisplayName("정상적인 요청 시 성공 응답을 반환한다")
    public void addPopReturns2xx() throws Exception {
        //given
        Long popCount = 100L;
        String newToken = "new-jwt-token";

        TokenClaims tokenClaims = TokenClaims.builder()
                .ipAddress(VALID_IP)
                .regionCode(VALID_REGION_CODE).build();

        given(geoIpService.fetchRegionCodeByIpAddress(VALID_IP))
                .willReturn(VALID_REGION_CODE);
        given(popService.addPops(any(PopCommand.class))).willReturn(popCount);
        given(jwtProvider.generateToken(VALID_IP, VALID_REGION_CODE))
                .willReturn(newToken);


        //when&then
        mockmvc.perform(post("/api/v1/pop")
                        .with(csrf())
                        .with(authentication(new JwtAuthenticationToken(tokenClaims, VALID_IP, Collections.EMPTY_LIST)))
                        .queryParam("count", String.valueOf(popCount)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.countAppend").value(popCount))
                .andExpect(jsonPath("$.data.isProcessed").value(true));
    }
}