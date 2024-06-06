package ma.order.analysis.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class SalesByDate {
    Date date;
    long SalesNum;
}
