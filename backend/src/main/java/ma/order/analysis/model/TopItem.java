package ma.order.analysis.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TopItem {
    private Item item;
    private long count;
    private int pourcentage;
    private boolean progress;

    public TopItem(Item item, long count) {
        this.item = item;
        this.count = count;
        pourcentage=0;
        progress=false;
    }
}
