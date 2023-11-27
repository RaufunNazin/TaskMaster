package com.backend.todolist.service;

import com.backend.todolist.auth.repository.CategoryRepository;
import com.backend.todolist.controller.CategoryAddRequest;
import com.backend.todolist.errorhandler.BadRequestException;
import com.backend.todolist.errorhandler.ResourceNotFoundException;
import com.backend.todolist.model.Category;
import com.backend.todolist.observer.NotificationSystem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final NotificationSystem notificationSystem = new NotificationSystem();

    @Autowired
    private CategoryRepository categoryRepository;

    public Category addCategory(CategoryAddRequest categoryAddRequest, String username) {

        Category category =  categoryRepository.findByTitleAndUsername(categoryAddRequest.getTitle(), username);
        if(category != null) {
            throw new BadRequestException("This Category already exists for " + username);
        }
        Category _category = new Category(username, categoryAddRequest.getTitle());

        notificationSystem.createCategory();

        return categoryRepository.save(_category);
    }

    public Category readById(long id, String username){
        Category category = categoryRepository.findByUsernameAndCategoryId(username, id);
        if(category == null){
            throw new ResourceNotFoundException("Category not found");
        }
        return category;
    }
    public List<Category> readAll(String username){
        return categoryRepository.findAllByUsername(username);
    }

    public void deleteById(Long id, String username) {
        Category category = categoryRepository.findByUsernameAndCategoryId(username, id);
        categoryRepository.deleteById(id);
    }

//    @PostConstruct
//    public void initializeDefaultCategories() {
//        List<String> defaultCategoryTitles = Arrays.asList("Personal", "Work", "Important");
//
//        for (String categoryTitle : defaultCategoryTitles) {
//            Category category = categoryRepository.findByTitle(categoryTitle);
//            if (category == null) {
//                category = new Category();
//                category.setTitle(categoryTitle);
//                // Set other properties if needed
//                categoryRepository.save(category);
//            }
//        }
//    }

    // You can add more methods like updateCategory, etc. as per your requirements
}