package com.backend.todolist.controller;

import com.backend.todolist.model.Category;
import com.backend.todolist.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(value = "/api/category", method = RequestMethod.POST)
    public ResponseEntity<Category> addCategory(@Valid @RequestBody CategoryRequest categoryRequest, Principal principal) {
        return new ResponseEntity<>(categoryService.addCategory(categoryRequest, principal.getName()), HttpStatus.CREATED);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/api/category/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteCategory(@PathVariable long id, Principal principal) {
        categoryService.deleteById(id, principal.getName());
        return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
    }
}

