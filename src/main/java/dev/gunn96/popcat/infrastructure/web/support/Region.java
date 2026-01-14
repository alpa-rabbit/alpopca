package dev.gunn96.popcat.infrastructure.web.support;

import dev.gunn96.popcat.domain.vo.RegionCode;

import static dev.gunn96.popcat.domain.vo.RegionCode.*;

/**
 * region code 기반 국가 정보
 * @param code
 * @param englishName
 * @param koreanName
 * @param flagEmoji
 */
public record Region(RegionCode code,
                     String englishName,
                     String koreanName,
                     String flagEmoji) {

    public static Region of(RegionCode code) {
        return switch (code) {
            case KR -> new Region(KR, "South Korea", "대한민국", "🇰🇷");
            case US -> new Region(US, "United States", "미국", "🇺🇸");
            case JP -> new Region(JP, "Japan", "일본", "🇯🇵");
            //TODO Region추가하기
            default -> new Region(UNKNOWN, "Unknown", "알 수 없음", "🏳️");
        };
    }
}
