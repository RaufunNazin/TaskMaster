package com.backend.todolist.service;

import com.backend.todolist.controller.CountResponse;
import com.backend.todolist.controller.TodoCreateRequest;
import com.backend.todolist.controller.TodoUpdateRequest;
import com.backend.todolist.model.Todo;

import java.util.List;

public interface TodoServiceDecorator {
    Todo create(TodoCreateRequest todoCreateRequest, String username);
    Todo readById(long id, String username);
    List<Todo> readAll(String username);
    List<Todo> readAllPageable(String username, String pageNumber, String pageSize);
    List<Todo> readAllByIsCompleted(String username, String isCompleted);
    List<Todo> readAllByIsCompletedPageable(String username, String isCompleted, String pageNumber, String pageSize);
    void deleteById(long id, String username);
    Todo updateById(long id, TodoUpdateRequest todoUpdateRequest, String username);
    Todo markCompleteById(long id, String username);
    CountResponse countAll(String username);
    CountResponse countAllByIsCompleted(String username, String isCompleted);
}
