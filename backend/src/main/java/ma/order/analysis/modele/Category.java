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
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String name;
    private String image;
    @Temporal(TemporalType.TIMESTAMP)
    private Date created;
    @OneToMany(mappedBy = "category")
    private List<Item> items;
    @Transient
    private int itemsNum;

    @PrePersist
    protected void onCreate() {
        this.created = new Date();
    }
    public int getItemsNum() {
        return this.items.size();
    }
}
