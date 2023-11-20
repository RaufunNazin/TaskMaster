package com.backend.todolist.controller;

import com.backend.todolist.errorhandler.CustomException;
import com.backend.todolist.model.Category;
import com.backend.todolist.model.Todo;
import com.backend.todolist.service.CategoryService;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
@ApiResponses(value = {
        @ApiResponse(code=400, message = "Bad Request", response = CustomException.class),
        @ApiResponse(code=401, message = "Unauthorized", response = CustomException.class),
        @ApiResponse(code=403, message = "Forbidden", response = CustomException.class),
        @ApiResponse(code=404, message = "Not Found", response = CustomException.class)
})
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(value = "/api/category", method = RequestMethod.POST)
    public ResponseEntity<Category> addCategory(@Valid @RequestBody CategoryAddRequest categoryAddRequest, Principal principal) {
        return new ResponseEntity<>(categoryService.addCategory(categoryAddRequest, principal.getName()), HttpStatus.CREATED);
    }

    @ResponseStatus(code = HttpStatus.OK)
    @RequestMapping(value = "/api/category/{id}", method = RequestMethod.GET)
    public ResponseEntity<Category> read(@PathVariable long id, Principal principal) {
        return new ResponseEntity<>(categoryService.readById(id, principal.getName()), HttpStatus.OK);
    }

    @ResponseStatus(code = HttpStatus.OK)
    @RequestMapping(value = "/api/category", method = RequestMethod.GET)
    public ResponseEntity<List<Category>> readAll(Principal principal){
        return new ResponseEntity<>(categoryService.readAll(principal.getName()), HttpStatus.OK);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/api/category/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteCategory(@PathVariable long id, Principal principal) {
        categoryService.deleteById(id, principal.getName());
        return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
    }
}
