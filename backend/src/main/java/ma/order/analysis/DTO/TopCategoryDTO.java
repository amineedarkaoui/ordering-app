package ma.order.analysis.DTO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TopCategoryDTO {
    private CategoryDTO category;
    private long count;
    private int pourcentage;
    private boolean progress;
}
