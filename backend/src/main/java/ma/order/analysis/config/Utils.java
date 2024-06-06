package ma.order.analysis.config;


import ma.order.analysis.DTO.SalesByDate;
import ma.order.analysis.DTO.SalesKeyValues;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

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

    public SalesKeyValues getWeeklyItemSales(List<SalesByDate> data) {
        List<String> days = new ArrayList<>();
        List<Long> values = new ArrayList<>(Collections.nCopies(7, 0L));
        LocalDateTime now = LocalDateTime.now();
        for (int i = 6 ; i >= 0; i--) {
            days.add(now.minusDays(i).getDayOfWeek().name());
            System.out.println(i + " : " + now.minusDays(i).getDayOfWeek().name());
        }

        data.forEach(item -> {
            int index = 0;
            for(String day : days) {
                if (item.getDate().toLocalDate().getDayOfWeek().name().equals(day)) {
                    values.set(index, item.getSalesNum());
                }
                index ++;
            };
        });

        return SalesKeyValues.builder().values(values).keys(days).build();
    }

    public SalesKeyValues getMonthlyItemSales(List<SalesByDate> data) {
        List<LocalDate> dates = new ArrayList<>();
        List<String> keys = new ArrayList<>();
        List<Long> values = new ArrayList<>(Collections.nCopies(30, 0L));
        LocalDate now = LocalDate.now();
        for (int i = 29 ; i >= 0; i--) {
            dates.add(now.minusDays(i));
        }

        data.forEach(item -> {
            int index = 0;
            for(LocalDate date : dates) {
                if (item.getDate().toLocalDate().equals(date)) {
                    values.set(index, item.getSalesNum());
                }
                index ++;
            };
        });

        dates.forEach(date -> {
            keys.add(date.getDayOfMonth() + "/" + date.getMonthValue());
        });

        return SalesKeyValues.builder().values(values).keys(keys).build();
    }

    public SalesKeyValues getItemSalesByYear(List<SalesByDate> data) {
        List<String> keys = List.of("JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
                "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER");
        List<Long> values = new ArrayList<>(Collections.nCopies(12, 0L));
        LocalDate now = LocalDate.now();

        data.forEach(item -> {
            int index = 0;
            for(String key : keys) {
                if (item.getDate().toLocalDate().getMonth().name().equals(key)) {
                    values.set(index, item.getSalesNum());
                    for (int i = index+1; i < values.size(); i++)
                        values.set(i, null);
                }
                index ++;
            };
        });

        return SalesKeyValues.builder().values(values).keys(keys).build();
    }
}
