package ma.order.analysis.service;


import lombok.RequiredArgsConstructor;
import ma.order.analysis.DTO.*;
import ma.order.analysis.config.MediaFormater;
import ma.order.analysis.model.Item;
import ma.order.analysis.model.TopCategory;
import ma.order.analysis.model.TopItem;
import ma.order.analysis.config.Utils;
import ma.order.analysis.repository.ItemRepository;
import ma.order.analysis.repository.SaleRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SaleService {
    private final SaleRepository saleRepository;
    private final Utils utils;
    private final ModelMapper modelMapper;
    private final MediaFormater mediaFormater;
    private final ItemRepository itemRepository;

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

    public List<ItemSales> getTopItems(long days) throws Exception {
        return saleRepository.getTopItems(utils.getDateMinusDays(days));
    }

    public double getMonthlyIncome() throws Exception {
        return saleRepository.getMonthlyIncome(utils.getPastMonth());
    }

    public List<MonthIncome> getIncomeProgress() throws Exception {
        return saleRepository.getIncomeProgress(utils.getCurrentYear());
    }

    public SalesKeyValues getSalesByDay(long id) throws Exception {
        return utils.getWeeklyItemSales(saleRepository.getSalesByDay(id, utils.getDateMinusDays(7L)));
    }

    public SalesKeyValues getMonthlySales(long id) throws Exception {
        return utils.getMonthlyItemSales(saleRepository.getSalesByDay(id, utils.getDateMinusDays(30L)));
    }

    public SalesKeyValues getSalesByYear(long id, long year) throws Exception {
        return utils.getItemSalesByYear(saleRepository.getSalesByYear(id, year));
    }

    public List<ItemsTableRow> getItemsTable(Long days) throws Exception {
        List<ItemsTableRow> items = null;
        if (days == null) {
            items = saleRepository.getItemsTableOfAllTime();
        } else {
            items = saleRepository.getItemsTable(utils.getDateMinusDays(days), days);
        }

        return  items.stream().map(item -> {
            double avg = days != null ? (double) item.getSalesNum() / days : 0;
            item.setAvg((double)(Math.round(avg*100)) / 100);
            return item;
        }).toList();
    }
}
