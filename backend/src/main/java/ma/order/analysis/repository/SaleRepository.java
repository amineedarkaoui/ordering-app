package ma.order.analysis.repository;

import ma.order.analysis.DTO.ItemSales;
import ma.order.analysis.DTO.MonthIncome;
import ma.order.analysis.model.TopCategory;
import ma.order.analysis.model.TopItem;
import ma.order.analysis.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {
    @Query("SELECT new ma.order.analysis.model.TopItem(e.item, COUNT(e.id)) FROM Sale e WHERE e.created>:date AND e.isCanceled = false GROUP BY e.item ORDER BY COUNT(e.id) DESC LIMIT 1")
    TopItem getTopItem(LocalDateTime date);

    @Query("SELECT new ma.order.analysis.model.TopCategory(e.item.category, COUNT(e.id)) FROM Sale e WHERE e.created>:date AND e.isCanceled = false GROUP BY e.item.category ORDER BY COUNT(e.id) DESC LIMIT 1")
    TopCategory getTopCategory(LocalDateTime date);

    @Query("SELECT new ma.order.analysis.DTO.ItemSales(e.item.name, COUNT(e.id)) FROM Sale e WHERE e.created>:date AND e.isCanceled = false AND e.item.deleted = false GROUP BY e.item ORDER BY COUNT(e.id) DESC LIMIT 15")
    List<ItemSales> getTopItems(LocalDateTime date);

    @Query("SELECT SUM(e.price) FROM Sale e WHERE e.created>:date AND e.isCanceled = false")
    double getMonthlyIncome(LocalDateTime date);

    @Query("SELECT new ma.order.analysis.DTO.MonthIncome(MONTH(e.created), SUM(e.price)) FROM Sale e WHERE YEAR(e.created) = :year AND e.isCanceled = false GROUP BY MONTH(e.created)")
    List<MonthIncome> getIncomeProgress(long year);
}
