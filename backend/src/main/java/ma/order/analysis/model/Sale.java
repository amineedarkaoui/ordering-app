package ma.order.analysis.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double price;
    @Temporal(TemporalType.TIMESTAMP)
    private Date created;
    @ManyToOne
    @JoinColumn(name = "item_id", nullable = true)
    private Item item;
    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "order_id")
    private Order order;
    @Column(columnDefinition = "boolean default false")
    private boolean isCanceled;


    @PrePersist
    protected void onCreate() {
        this.created = new Date();
    }
}
