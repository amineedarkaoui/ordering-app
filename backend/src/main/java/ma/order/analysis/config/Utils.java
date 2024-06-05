package ma.order.analysis.config;


import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Component
public class Utils {
    public LocalDateTime getPastMonth() {
        LocalDateTime now = LocalDateTime.now();
        return now.minusDays(30);
    }

    public long getCurrentYear() {
        LocalDateTime now = LocalDateTime.now();
        return now.getYear();
    }

    public LocalDateTime getDateMinusDays(long days) {
        LocalDateTime now = LocalDateTime.now();
        return now.minusDays(days);
    }
}
