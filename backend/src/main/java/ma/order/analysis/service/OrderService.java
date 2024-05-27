package ma.order.analysis.service;


import lombok.RequiredArgsConstructor;
import ma.order.analysis.DTO.OrderDTO;
import ma.order.analysis.DTO.PlaceOrderDTO;
import ma.order.analysis.DTO.SaleDTO;
import ma.order.analysis.modele.Item;
import ma.order.analysis.modele.Order;
import ma.order.analysis.modele.Sale;
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

    public void placeOrder(List<PlaceOrderDTO> order) {
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

    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAsc()
                .stream()
                .map(order ->
                    modelMapper.map(order, OrderDTO.class))
                .toList();
    }
}
