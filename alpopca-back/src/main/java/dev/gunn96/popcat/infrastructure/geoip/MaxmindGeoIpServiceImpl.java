package dev.gunn96.popcat.infrastructure.geoip;


import com.maxmind.geoip2.DatabaseReader;
import com.maxmind.geoip2.exception.GeoIp2Exception;
import dev.gunn96.popcat.support.exception.GeoIpException;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.net.InetAddress;
import java.net.UnknownHostException;

@Slf4j
@Service
@RequiredArgsConstructor
public class MaxmindGeoIpServiceImpl implements GeoIpService {
    private static final String UNKNOWN = "UNKNOWN";

    @Value("${geoip.database.path}")
    private String databasePath;

    private final ResourceLoader resourceLoader;
    private DatabaseReader reader;

    @PostConstruct
    public void initialize() {
        initializeReader(databasePath);
    }

    public String fetchRegionCodeByIpAddress(String ipAddress) {
        try {
            InetAddress address = InetAddress.getByName(ipAddress);
            if (address.isLoopbackAddress()) {
                log.info("localhost address request");
                return "KR";
            }
            return reader.tryCountry(address)
                    .map(response -> response.getCountry().getIsoCode())
                    .orElse(UNKNOWN);
        } catch (UnknownHostException e) {
            throw new GeoIpException.InvalidIpAddressException(ipAddress, e);
        } catch (IOException | GeoIp2Exception e) {
            throw new GeoIpException.DatabaseLookupException(ipAddress, e);
        }
    }

    private void initializeReader(String path) {
        try {
            Resource resource = resourceLoader.getResource(path);
            try (InputStream inputStream = resource.getInputStream()) {
                reader = new DatabaseReader.Builder(inputStream).build();
            }
        } catch (IOException e) {
            throw new GeoIpException.DatabaseInitializationException(e);
        }
    }


    @PreDestroy
    public void cleanup() {
        if (reader != null) {
            try {
                reader.close();
            } catch (IOException e) {
                throw new GeoIpException.DatabaseInitializationException(e);
            }
        }
    }
}