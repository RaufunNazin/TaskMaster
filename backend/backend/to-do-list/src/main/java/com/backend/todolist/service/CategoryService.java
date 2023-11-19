package com.backend.todolist.service;

import com.backend.todolist.auth.repository.CategoryRepository;
import com.backend.todolist.controller.CategoryAddRequest;
import com.backend.todolist.errorhandler.ResourceNotFoundException;
import com.backend.todolist.model.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category addCategory(CategoryAddRequest categoryAddRequest, String username) {
        Category category = new Category(username, categoryAddRequest.getTitle());

        return categoryRepository.save(category);
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

    public List<Category> getAllCategoriesByUsername(String username) {
        return categoryRepository.findAllByUsername(username);
    }

    public Category getCategoryById(Long categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
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