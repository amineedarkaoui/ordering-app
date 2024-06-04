package ma.order.analysis.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.order.analysis.model.Item;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemSales {
    private String name;
    private long count;
}
