package ma.order.analysis.repository;

import ma.order.analysis.DTO.TopItem;
import ma.order.analysis.modele.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {
    @Query("SELECT e.item COUNT(e.id) AS items_count FROM sale e WHERE e.created>:date GROUP BY e.item ORDER BY items_count DESC LIMIT 1")
    TopItem getTopItem(LocalDateTime date);
}
