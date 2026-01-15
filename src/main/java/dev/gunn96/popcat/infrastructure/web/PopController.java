package dev.gunn96.popcat.infrastructure.web;


import dev.gunn96.popcat.application.dto.PopCommand;
import dev.gunn96.popcat.domain.vo.RegionCode;
import dev.gunn96.popcat.infrastructure.geoip.GeoIpService;
import dev.gunn96.popcat.infrastructure.security.jwt.JwtProvider;
import dev.gunn96.popcat.infrastructure.web.dto.request.PopRequest;
import dev.gunn96.popcat.support.ApiResponse;
import dev.gunn96.popcat.infrastructure.web.dto.response.PopResponse;
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
    private final GeoIpService geoIpService;
    private final JwtProvider jwtProvider;

    @PostMapping
    public ApiResponse<PopResponse> addPops(
            @RequestParam("count") Long count,
            @AuthenticationPrincipal TokenClaims claims
    ) {
        log.info("Add pops with count {} for IP {} and region {}",
                count, claims.ipAddress(), claims.regionCode());
        //1. IP -> Region Code
        PopRequest popRequest = PopRequest.of(claims.ipAddress(), count);
        RegionCode regionCode = RegionCode.fromString(
                geoIpService.fetchRegionCodeByIpAddress(popRequest.ipAddress().value()));

        //2. Pop
        PopCommand popCommand = new PopCommand(regionCode, popRequest.popCount());
        Long addedCount = popService.addPops(popCommand);

        //3. 토큰 생성
        String newToken = jwtProvider.generateToken(
                popRequest.ipAddress().value(),
                regionCode.name()
        );
        //4. 응답에 함께 실어서 리턴
        PopResponse popResponse = PopResponse.builder()
                .isProcessed(true)
                .countAppend(addedCount)
                .newToken(newToken)
                .build();

        return ApiResponse.success(popResponse);
    }

}


