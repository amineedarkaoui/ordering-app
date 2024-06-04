package ma.order.analysis.repository;

import ma.order.analysis.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findByName(String name);
    List<Category> findByDeleted(boolean isDeleted);
    Category findByIdAndDeleted(long id, boolean isDeleted);
}
