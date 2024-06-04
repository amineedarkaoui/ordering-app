package ma.order.analysis.service;


import lombok.RequiredArgsConstructor;
import ma.order.analysis.DTO.*;
import ma.order.analysis.config.MediaFormater;
import ma.order.analysis.model.TopCategory;
import ma.order.analysis.model.TopItem;
import ma.order.analysis.config.Utils;
import ma.order.analysis.repository.SaleRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SaleService {
    private final SaleRepository saleRepository;
    private final Utils utils;
    private final ModelMapper modelMapper;
    private final MediaFormater mediaFormater;

    public TopItemDTO getTopItem() throws Exception {
        TopItemDTO topItem = modelMapper.map(saleRepository.getTopItem(utils.getPastMonth()), TopItemDTO.class);
        ItemDTO item = topItem.getItem();
        item.setImage(mediaFormater.formatMedia(item.getImage()));
        topItem.setItem(item);
        return topItem;
    }

    public TopCategoryDTO getTopCategory() throws Exception {
        TopCategoryDTO topCategory = modelMapper.map(saleRepository.getTopCategory(utils.getPastMonth()), TopCategoryDTO.class);
        CategoryDTO category = topCategory.getCategory();
        category.setImage(mediaFormater.formatMedia(category.getImage()));
        topCategory.setCategory(category);
        return topCategory;
    }

    public List<ItemSales> getTopItems() throws Exception {
        return saleRepository.getTopItems(utils.getPastMonth());
    }

    public double getMonthlyIncome() throws Exception {
        return saleRepository.getMonthlyIncome(utils.getPastMonth());
    }

    public List<MonthIncome> getIncomeProgress() throws Exception {
        return saleRepository.getIncomeProgress(utils.getCurrentYear());
    }
}
