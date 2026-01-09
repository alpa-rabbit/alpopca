package dev.gunn96.popcat.infrastructure.web;


import dev.gunn96.popcat.support.ApiResponse;
import dev.gunn96.popcat.infrastructure.web.dto.PopResponse;
import dev.gunn96.popcat.infrastructure.security.jwt.TokenClaims;
import dev.gunn96.popcat.application.PopService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/pop")
public class PopController {
    private final PopService popService;

    @PostMapping
    public ApiResponse<PopResponse> addPops(
            @RequestParam("count") Long count,
            @AuthenticationPrincipal TokenClaims claims
    ) {
        //1. IP -> Region Code로 변경
        //2. Pop을 Region에 반영
        //3. 토큰 생성
        //4. 응답에 함께 실어서 리턴
        log.info("Add pops with count {} for IP {} and region {}",
                count, claims.ipAddress(), claims.regionCode());
        PopResponse popResponse = null;
        return ApiResponse.success(popResponse);
    }

}


