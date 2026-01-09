package dev.gunn96.popcat.infrastructure.web.dto.request;

import dev.gunn96.popcat.domain.vo.ClickCount;
import dev.gunn96.popcat.domain.vo.IpAddress;

/**
 * 컨트롤러에서 받은 클릭 요청
 * GeoIp를 통해 IP를 지역코드로 변환하기 전
 * @param ipAddress
 * @param clickCount
 */
public record ClickRequest(IpAddress ipAddress, ClickCount clickCount) {
}
