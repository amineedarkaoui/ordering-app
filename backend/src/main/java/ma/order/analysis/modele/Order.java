package ma.order.analysis.modele;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Table(name = "client_order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "boolean default false")
    private boolean isCanceled;
    @Temporal(TemporalType.TIMESTAMP)
    private Date created;
    @OneToMany(mappedBy = "order")
    private List<Sale> sales;
    @Transient
    private double totalPrice;

    @PrePersist
    protected void onCreate() {
        this.created = new Date();
    }

    public double getTotalPrice() {
        double total = 0;
        for (Sale sale : this.sales) {
            total += sale.getPrice();
        }
        return total;
    }
}
