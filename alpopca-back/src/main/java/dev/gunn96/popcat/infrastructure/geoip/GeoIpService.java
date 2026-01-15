package dev.gunn96.popcat.infrastructure.geoip;

public interface GeoIpService {
    String fetchRegionCodeByIpAddress(String ipAddress);
}
