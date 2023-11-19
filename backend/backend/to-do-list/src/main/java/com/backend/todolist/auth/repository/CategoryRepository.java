package com.backend.todolist.auth.repository;

import com.backend.todolist.model.Category;
import com.backend.todolist.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findAllByUsername(String username);
    Category findCategoryByCategoryId(Long id);
    Category deleteCategoryByCategoryId(Long id);
    Category findByUsernameAndCategoryId(String username, long id);

//    Category findByTitle(String categoryTitle);
}
