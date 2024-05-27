package ma.order.analysis.controller;

import lombok.RequiredArgsConstructor;
import ma.order.analysis.service.ItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("ordering-app/api/v1/item")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;

    @GetMapping("/get-category-items")
    public ResponseEntity<?> getCategoryItems(@RequestParam("id") long id) {
        try {
            return ResponseEntity.ok(itemService.getCategoryItems(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}
