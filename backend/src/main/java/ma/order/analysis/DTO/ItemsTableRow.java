package ma.order.analysis.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemsTableRow {
    private long id;
    private String name;
    private long salesNum;
    private double TotalIncome;
    private double avg;
    private double price;
}
