package ma.order.analysis.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class MediaFormater {
    @Value("${server.port}")
    private String port;
    @Value("${server.ip-address}")
    private String address;

    public String formatMedia(String fileName) {
        return "http://" + address + ":" + port + "/media/" + fileName;
    }
}
