package ma.order.analysis.controller;

import jakarta.persistence.PostRemove;
import lombok.RequiredArgsConstructor;
import ma.order.analysis.DTO.CategoryDTO;
import ma.order.analysis.service.ItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping("/add-new-item")
    public ResponseEntity<?> addNewItem(@RequestParam("name") String name,
                                        @RequestParam("price") double price,
                                        @RequestBody CategoryDTO categoryDTO) {
        try {

            return ResponseEntity.ok(itemService.addNewItem(name, price, categoryDTO));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
    @PutMapping("/update-item-image")
    public ResponseEntity<?> addNewItem(@RequestParam("id") long id,
                                        @RequestParam("image") MultipartFile image) {
        try {
            itemService.updateItemImage(id, image);
            return ResponseEntity.ok("Item image has been added successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PutMapping("/update-item")
    public ResponseEntity<?> addNewItem(@RequestParam("id") long id,
                                        @RequestParam("name") String name,
                                        @RequestParam("price") double price,
                                        @RequestBody CategoryDTO categoryDTO) {
        try {
            itemService.updateItem(id, name, price, categoryDTO);
            return ResponseEntity.ok("Item has been updated successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PutMapping("/delete-item")
    public ResponseEntity<?> addNewItem(@RequestParam("id") long id) {
        try {
            itemService.deleteItem(id);
            return ResponseEntity.ok("Item has been deleted successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/get-all-items")
    public ResponseEntity<?> findItemsBySalesNum() {
        try {
            return ResponseEntity.ok(itemService.findItemsBySalesNum());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}
