package ma.order.analysis.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TopCategory {
    private Category category;
    private long count;
    private int pourcentage;
    private boolean progress;

    public TopCategory(Category category, long count) {
        this.category = category;
        this.count = count;
        pourcentage=0;
        progress=false;
    }
}