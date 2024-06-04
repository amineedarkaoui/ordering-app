package ma.order.analysis.service;


import lombok.RequiredArgsConstructor;
import ma.order.analysis.DTO.CategoryDTO;
import ma.order.analysis.DTO.ItemDTO;
import ma.order.analysis.config.FileSaver;
import ma.order.analysis.config.MediaFormater;
import ma.order.analysis.model.Category;
import ma.order.analysis.model.Item;
import ma.order.analysis.repository.CategoryRepository;
import ma.order.analysis.repository.ItemRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;
    private final CategoryRepository categoryRepository;
    private final MediaFormater mediaFormater;
    private final ModelMapper modelMapper;
    private final FileSaver fileSaver;

    public List<ItemDTO> getCategoryItems(long id) {
        Category category = categoryRepository.findByIdAndDeleted(id, false);
        List<ItemDTO> items = new ArrayList<>();
        category.getItems().forEach(
                item -> {
                    if (!(item.isDeleted())) {
                        ItemDTO newItem = modelMapper.map(item, ItemDTO.class);
                        newItem.setImage(mediaFormater.formatMedia(item.getImage()));
                        items.add(newItem);
                    }

                }
        );

        return items;
    }

    public long addNewItem(String name, double price, CategoryDTO categoryDTO) throws Exception {
        Item item = Item.builder()
                .name(name)
                .price(price)
                .category(modelMapper.map(categoryDTO, Category.class))
                .build();
        Item newItem = itemRepository.save(item);
        return newItem.getId();
    }
    public void updateItemImage(long id, MultipartFile image) throws Exception {
        Item item = itemRepository.findById(id).get();
        item.setImage(fileSaver.saveFile(image));
        itemRepository.save(item);
    }

    public void deleteItem(long id) throws Exception {
        Item item = itemRepository.findById(id).get();
        item.setDeleted(true);
        itemRepository.save(item);
    }

    public void updateItem(long id, String name, double price, CategoryDTO categoryDTO) throws Exception {
        Item item = itemRepository.findById(id).get();
        item.setCategory(modelMapper.map(categoryDTO, Category.class));
        item.setName(name);
        item.setPrice(price);
        itemRepository.save(item);
    }

    public List<ItemDTO> findItemsBySalesNum() throws  Exception {
        return itemRepository.findItemsBySalesNum().stream().map(sale -> modelMapper.map(sale, ItemDTO.class)).toList();
    }

}
