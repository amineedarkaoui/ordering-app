package ma.order.analysis.repository;

import ma.order.analysis.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByDeleted(boolean isDeleted);

    @Query("SELECT e FROM Item e WHERE e.deleted = false ORDER BY SIZE(e.sales) DESC")
    List<Item> findItemsBySalesNum();

}
