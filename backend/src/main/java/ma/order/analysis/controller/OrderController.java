package ma.order.analysis.controller;


import lombok.RequiredArgsConstructor;
import ma.order.analysis.DTO.PlaceOrderDTO;
import ma.order.analysis.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("ordering-app/api/v1/order")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/place-order")
    public ResponseEntity<?> placeOrder(@RequestBody List<PlaceOrderDTO> order) {
        try {
            orderService.placeOrder(order);
            return ResponseEntity.ok("Order has been placed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/get-all-orders")
    public ResponseEntity<?> getAllOrders() {
        try {
            return ResponseEntity.ok(orderService.getAllOrders());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/switch-cancel-order")
    public ResponseEntity<?> switchCancelOrder(@RequestParam("id") long id) {
        try {
            return ResponseEntity.ok(orderService.switchCancelOrder(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

}
