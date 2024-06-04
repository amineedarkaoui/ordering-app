package ma.order.analysis.repository;

import ma.order.analysis.DTO.OrdersByDay;
import ma.order.analysis.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;


@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByOrderByCreatedDesc();

    @Query("SELECT COUNT(*) FROM Order e WHERE e.created > :date AND e.isCanceled = false")
    long getMonthlyOrders(LocalDateTime date);

    @Query("SELECT e FROM Order e WHERE e.created > :date AND e.isCanceled = false")
    List<Order> findOrdersSince(LocalDateTime date);

    @Query("SELECT new ma.order.analysis.DTO.OrdersByDay(DAYOFWEEK(e.created), COUNT(*)) FROM Order e WHERE e.created > :date AND e.isCanceled = false GROUP BY DAYOFWEEK(e.created) ORDER BY COUNT(*) DESC LIMIT 1")
    OrdersByDay getPeakDay(LocalDateTime date);
}
