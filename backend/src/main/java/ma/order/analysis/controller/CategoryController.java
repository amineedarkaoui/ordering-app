package ma.order.analysis.controller;


import lombok.RequiredArgsConstructor;
import ma.order.analysis.DTO.CategoryDTO;
import ma.order.analysis.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("ordering-app/api/v1/category")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("/get-all-categories")
    public ResponseEntity<?> getAllCategories() {
        try {
            return ResponseEntity.ok(categoryService.getAllCategories());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/add-new-category")
    public ResponseEntity<?> addNewCategory(@RequestParam("name") String name,
                                            @RequestParam("image") MultipartFile image) {
        try {
            categoryService.addNewCategory(name, image);
            return ResponseEntity.ok("category has been created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PutMapping("/delete-category")
    public ResponseEntity<?> deleteCategory(@RequestParam("id") long id) {
        try {
            categoryService.deleteCategory(id);
            return ResponseEntity.ok("category has been deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PutMapping("/update-category")
    public ResponseEntity<?> updateCategory(@RequestParam("id") long id,
                                            @RequestParam("name") String name,
                                            @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            categoryService.updateCategory(id, name, image);
            return ResponseEntity.ok("category has been updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}
