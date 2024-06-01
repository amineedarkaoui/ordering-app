package ma.order.analysis.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class MediaFormater {
    @Value("${server.port}")
    private String port;
    @Value("${server.ip-address}")
    private String address;

    public String formatMedia(String fileName) {
        return "http://" + address + ":" + port + "/media/" + fileName;
    }

    public String addRandomSequence(String name) {
        String[] parts = name.split("\\.");
        String randomSequence = UUID.randomUUID().toString();
        String firstSequence = randomSequence.split("-")[0];
        return parts[0] + "-" + firstSequence + "." + parts[parts.length-1];
    }
}
