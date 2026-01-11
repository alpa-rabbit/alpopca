package dev.gunn96.popcat.infrastructure.web.dto.request;

import dev.gunn96.popcat.domain.vo.PopCount;
import dev.gunn96.popcat.domain.vo.IpAddress;

/**
 * 컨트롤러에서 받은 클릭 요청
 * GeoIp를 통해 IP를 지역코드로 변환하기 전
 * @param ipAddress
 * @param popCount
 */
public record PopRequest(IpAddress ipAddress, PopCount popCount) {
    public static PopRequest of(String ipString, long count){
        return new PopRequest(new IpAddress(ipString), new PopCount(count));
    }
}
