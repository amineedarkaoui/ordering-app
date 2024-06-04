package ma.order.analysis.service;


import lombok.RequiredArgsConstructor;
import ma.order.analysis.DTO.OrderDTO;
import ma.order.analysis.DTO.OrdersByDay;
import ma.order.analysis.DTO.PlaceOrderDTO;
import ma.order.analysis.DTO.SaleDTO;
import ma.order.analysis.config.Utils;
import ma.order.analysis.model.Item;
import ma.order.analysis.model.Order;
import ma.order.analysis.model.Sale;
import ma.order.analysis.repository.OrderRepository;
import ma.order.analysis.repository.SaleRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final SaleRepository saleRepository;
    private final ModelMapper modelMapper;
    private final Utils utils;

    public void placeOrder(List<PlaceOrderDTO> order) throws Exception {
        Order savedOrder = orderRepository.save(Order.builder().build());
        List<SaleDTO> sales = new ArrayList<>();
        for (PlaceOrderDTO orderItem : order) {
            for (int i=0; i<orderItem.getCount(); i++) {
                Sale sale = Sale.builder()
                        .price(orderItem.getItem().getPrice())
                        .item(modelMapper.map(orderItem.getItem(), Item.class))
                        .order(savedOrder)
                        .build();

                saleRepository.save(sale);
            }
        }
    }

    public List<OrderDTO> getAllOrders() throws Exception {
        return orderRepository.findAllByOrderByCreatedDesc()
                .stream()
                .map(order ->
                        modelMapper.map(order, OrderDTO.class))
                .toList();
    }

    public boolean switchCancelOrder(long id) throws Exception {
        Order order = orderRepository.findById(id).get();
        order.getSales().forEach(sale -> {
            sale.setCanceled(!(sale.isCanceled()));
            saleRepository.save(sale);
        });
        order.setCanceled(!(order.isCanceled()));
        orderRepository.save(order);
        return order.isCanceled();
    }

    public double getMonthlyOrders() throws Exception {
        return orderRepository.getMonthlyOrders(utils.getPastMonth());
    }
    public String getAvgOrderPrice() throws Exception {
        double sum = 0;
        long count = 0;

       for (Order order : orderRepository.findOrdersSince(utils.getPastMonth())) {
           count++;
           sum += order.getTotalPrice();
       }

       return String.format("%.2f", sum/count);
    }

    public OrdersByDay getPeakDay() throws Exception {
        return orderRepository.getPeakDay(utils.getPastMonth());
    }
}
