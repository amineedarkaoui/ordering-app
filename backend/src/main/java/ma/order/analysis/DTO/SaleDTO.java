package ma.order.analysis.DTO;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.order.analysis.modele.Item;
import ma.order.analysis.modele.Order;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SaleDTO {
    private Long id;
    private double price;
    private Date created;
    private ItemDTO item;
}
