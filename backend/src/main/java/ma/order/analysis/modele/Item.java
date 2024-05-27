package ma.order.analysis.modele;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double price;
    private String image;
    @Temporal(TemporalType.TIMESTAMP)
    private Date created;
    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
    @OneToMany(mappedBy = "item")
    private List<Sale> sales;

    @PrePersist
    protected void onCreate() {
        this.created = new Date();
    }
}
