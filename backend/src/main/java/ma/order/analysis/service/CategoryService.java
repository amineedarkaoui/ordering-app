package ma.order.analysis.service;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import ma.order.analysis.DTO.CategoryDTO;
import ma.order.analysis.config.MediaFormater;
import ma.order.analysis.repository.CategoryRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;
    private final MediaFormater mediaFormater;

    public List<CategoryDTO> getAllCategories() throws Exception {
        return categoryRepository.findAll().stream().map(
                category -> {
                    category.setImage(mediaFormater.formatMedia(category.getImage()));
                    return modelMapper.map(category, CategoryDTO.class);
                }
        ).toList();
    }
}
