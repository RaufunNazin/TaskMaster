package com.backend.todolist.decorator;

import com.backend.todolist.model.Todo;

public interface TodoDecorator {
    Todo addCategoryToTodo(Long todoId, Long categoryId, String username);

}
