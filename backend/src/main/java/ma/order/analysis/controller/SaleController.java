package ma.order.analysis.controller;


import lombok.RequiredArgsConstructor;
import ma.order.analysis.repository.SaleRepository;
import ma.order.analysis.service.SaleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("ordering-app/api/v1/sale")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class SaleController {
    private final SaleService saleService;

    @GetMapping("/get-top-item")
    public ResponseEntity<?> getTopItem() {
        try {
            return ResponseEntity.ok(saleService.getTopItem());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/get-top-category")
    public ResponseEntity<?> getTopCategory() {
        try {
            return ResponseEntity.ok(saleService.getTopCategory());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/get-top-items")
    public ResponseEntity<?> getTopItems() {
        try {
            return ResponseEntity.ok(saleService.getTopItems());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/get-monthly-income")
    public ResponseEntity<?> getMonthlyIncome() {
        try {
            return ResponseEntity.ok(saleService.getMonthlyIncome());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/get-income-progress")
    public ResponseEntity<?> getIncomeProgress() {
        try {
            return ResponseEntity.ok(saleService.getIncomeProgress());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

}
