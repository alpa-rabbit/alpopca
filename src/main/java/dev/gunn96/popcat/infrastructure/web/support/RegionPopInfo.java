package dev.gunn96.popcat.infrastructure.web.support;

import dev.gunn96.popcat.domain.RegionStats;
import dev.gunn96.popcat.domain.vo.RegionCode;

import java.util.Locale;

/**
 * region regionCode 기반 국가 정보
 * @param regionCode
 * @param englishName
 * @param koreanName
 * @param flagEmoji
 */
public record RegionPopInfo(RegionCode regionCode,
                            String englishName,
                            String koreanName,
                            String flagEmoji,
                            long popCount) {

        public static RegionPopInfo of(RegionStats domain) {
        Locale locale = new Locale("", domain.getRegionCode().name());

        return new RegionPopInfo(
                domain.getRegionCode(),
                getEnglishName(locale),
                getKoreanName(locale),
                toFlagEmoji(domain.getRegionCode().name()),
                domain.getPopCount().value()
        );
    }

    private static String getEnglishName(Locale locale) {
        String name = locale.getDisplayCountry(Locale.ENGLISH);
        return name.isEmpty() ? "Unknown" : name;
    }

    private static String getKoreanName(Locale locale) {
        String name = locale.getDisplayCountry(Locale.KOREAN);
        return name.isEmpty() ? "알 수 없음" : name;
    }

    // ISO 국가 코드 → 플래그 이모지 변환
    private static String toFlagEmoji(String countryCode) {
        if (countryCode == null || countryCode.length() != 2) {
            return "🏳️";
        }

        // 각 문자를 Regional Indicator Symbol로 변환
        int firstChar = Character.codePointAt(countryCode.toUpperCase(), 0) - 'A' + 0x1F1E6;
        int secondChar = Character.codePointAt(countryCode.toUpperCase(), 1) - 'A' + 0x1F1E6;

        return new String(Character.toChars(firstChar)) + new String(Character.toChars(secondChar));
    }
}
