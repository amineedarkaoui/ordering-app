package ma.order.analysis.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@AllArgsConstructor
@Data
public class SalesKeyValues {
    List<String> keys;
    List<Long> values;
}
