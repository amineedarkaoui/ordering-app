package ma.order.analysis.service;


import lombok.RequiredArgsConstructor;
import ma.order.analysis.DTO.CategoryDTO;
import ma.order.analysis.DTO.ItemDTO;
import ma.order.analysis.config.MediaFormater;
import ma.order.analysis.modele.Category;
import ma.order.analysis.repository.CategoryRepository;
import ma.order.analysis.repository.ItemRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;
    private final CategoryRepository categoryRepository;
    private final MediaFormater mediaFormater;
    private final ModelMapper modelMapper;

    public List<ItemDTO> getCategoryItems(long id) {
        Category category = categoryRepository.findById(id).get();
        return category.getItems().stream().map(
                item -> {
                    item.setImage(mediaFormater.formatMedia(item.getImage()));
                    return modelMapper.map(item, ItemDTO.class);
                }
        ).toList();
    }

}
