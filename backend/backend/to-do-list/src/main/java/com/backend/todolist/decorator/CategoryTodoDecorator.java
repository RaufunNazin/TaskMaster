//package com.backend.todolist.decorator;
//
//import com.backend.todolist.auth.repository.CategoryRepository;
//import com.backend.todolist.errorhandler.ResourceNotFoundException;
//import com.backend.todolist.model.Category;
//import com.backend.todolist.model.Todo;
//import com.backend.todolist.repository.TodoRepository;
//import com.backend.todolist.service.TodoService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//@Service
//public class CategoryTodoDecorator implements TodoDecorator {
//
//    @Autowired
//    TodoService todoService;
//
//    @Autowired
//    TodoRepository todoRepository;
//
//    @Autowired
//    CategoryRepository categoryRepository;
//
//
//    @Override
//    public Todo addCategoryToTodo(Long todoId, Long categoryId, String username) {
//        Todo todo = todoRepository.findById(todoId)
//                .orElseThrow(() -> new ResourceNotFoundException("TodoService not found"));
//
//        Category category = categoryRepository.findById(categoryId)
//                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
//
//        // Wrap the TodoService Object with the Category class (Decorator design pattern)
//        todo.setCategory(category);
//        return todoRepository.save(todo);
//    }
//
//}
