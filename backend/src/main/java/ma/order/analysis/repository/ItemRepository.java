package ma.order.analysis.repository;

import ma.order.analysis.modele.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByDeleted(boolean isDeleted);
}
