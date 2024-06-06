package ma.order.analysis.controller;


import lombok.RequiredArgsConstructor;
import ma.order.analysis.DTO.ItemDTO;
import ma.order.analysis.repository.SaleRepository;
import ma.order.analysis.service.SaleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

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
    public ResponseEntity<?> getTopItems(@RequestParam("days") long days) {
        try {
            return ResponseEntity.ok(saleService.getTopItems(days));
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

    @GetMapping("/get-weekly-item-sales")
    public ResponseEntity<?> getSalesByDay(@RequestParam("id") long id) {
        try {
            return ResponseEntity.ok(saleService.getSalesByDay(id));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/get-monthly-item-sales")
    public ResponseEntity<?> getMonthlySales(@RequestParam("id") long id) {
        try {
            return ResponseEntity.ok(saleService.getMonthlySales(id));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/get-item-sales-by-year")
    public ResponseEntity<?> getItemSalesByYear(@RequestParam("id") long id,
                                                @RequestParam(value = "year", required = false) Long year) {
        try {
            long y = year == null ? LocalDate.now().getYear() : year;
            return ResponseEntity.ok(saleService.getSalesByYear(id, y));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/get-items-table")
    public ResponseEntity<?> getItemsTable(@RequestParam(value = "days", required = false) Long days) {
        try {
            return ResponseEntity.ok(saleService.getItemsTable(days));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

}
