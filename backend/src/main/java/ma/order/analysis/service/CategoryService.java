package ma.order.analysis.service;

import lombok.RequiredArgsConstructor;
import ma.order.analysis.DTO.CategoryDTO;
import ma.order.analysis.config.FileSaver;
import ma.order.analysis.config.MediaFormater;
import ma.order.analysis.model.Category;
import ma.order.analysis.repository.CategoryRepository;
import ma.order.analysis.repository.ItemRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;
    private final MediaFormater mediaFormater;
    private final FileSaver fileSaver;
    private final ItemRepository itemRepository;

    public List<CategoryDTO> getAllCategories() throws Exception {
        return categoryRepository.findByDeleted(false).stream().map(
                category -> {
                    category.setImage(mediaFormater.formatMedia(category.getImage()));
                    return modelMapper.map(category, CategoryDTO.class);
                }
        ).toList();
    }

    public void addNewCategory(String name, MultipartFile image) throws Exception {
        Category category = Category.builder()
                .name(name)
                .image(fileSaver.saveFile(image))
                .build();
        categoryRepository.save(category);
    }

    public void deleteCategory(long id) throws Exception {
        Category category = categoryRepository.findById(id).get();
        category.getItems().forEach(item -> {
            item.setDeleted(true);
            itemRepository.save(item);
        });
        category.setDeleted(true);
        categoryRepository.save(category);
    }

    public void updateCategory(long id, String name, MultipartFile image) throws Exception {
        Category category = categoryRepository.findById(id).get();
        category.setName(name);
        category.setImage(image!=null ? fileSaver.saveFile(image) : category.getImage());
        categoryRepository.save(category);
    }
}
