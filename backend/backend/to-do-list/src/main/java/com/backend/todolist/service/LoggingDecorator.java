package com.backend.todolist.service;

import com.backend.todolist.controller.CountResponse;
import com.backend.todolist.controller.TodoCreateRequest;
import com.backend.todolist.controller.TodoUpdateRequest;
import com.backend.todolist.model.Todo;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import org.slf4j.Logger;

import java.util.List;

@Component
public class LoggingDecorator implements TodoServiceDecorator {
    private TodoService todoService;
    private Logger logger;

    public LoggingDecorator(TodoService todoService) {
        this.todoService = todoService;
        this.logger = LoggerFactory.getLogger(LoggingDecorator.class);
    }

    @Override
    public Todo create(TodoCreateRequest todoCreateRequest, String username) {
        logBefore("create");
        Todo todo = todoService.create(todoCreateRequest, username);
        logAfter("create");
        return todo;
    }

    @Override
    public Todo readById(long id, String username) {
        logBefore("readById");
        Todo todo = todoService.readById(id, username);
        logAfter("readById");
        return todo;
    }

    @Override
    public List<Todo> readAll(String username) {
        logBefore("readAll");
        List<Todo> todos = todoService.readAll(username);
        logAfter("readAll");
        return todos;
    }

    @Override
    public List<Todo> readAllPageable(String username, String pageNumber, String pageSize) {
        logBefore("readAllPageable");
        List<Todo> todos = todoService.readAllPageable(username, pageNumber, pageSize);
        logAfter("readAllPageable");
        return todos;
    }

    @Override
    public List<Todo> readAllByIsCompleted(String username, String isCompleted) {
        logBefore("readAllByIsCompleted");
        List<Todo> todos = todoService.readAllByIsCompleted(username, isCompleted);
        logAfter("readAllByIsCompleted");
        return todos;
    }

    @Override
    public List<Todo> readAllByIsCompletedPageable(String username, String isCompleted, String pageNumber, String pageSize) {
        logBefore("readAllByIsCompletedPageable");
        List<Todo> todos = todoService.readAllByIsCompletedPageable(username, isCompleted, pageNumber, pageSize);
        logAfter("readAllByIsCompletedPageable");
        return todos;
    }

    @Override
    public void deleteById(long id, String username) {
        logBefore("deleteById");
        todoService.deleteById(id, username);
        logAfter("deleteById");
    }


    @Override
    public Todo updateById(long id, TodoUpdateRequest todoUpdateRequest, String username) {
        logBefore("updateById");
        Todo todo = todoService.updateById(id, todoUpdateRequest, username);
        logAfter("updateById");
        return todo;
    }

    @Override
    public Todo markCompleteById(long id, String username) {
        logBefore("markCompleteById");
        Todo todo = todoService.markCompleteById(id, username);
        logAfter("markCompleteById");
        return todo;
    }

    @Override
    public CountResponse countAll(String username) {
        logBefore("countAll");
        CountResponse countResponse = todoService.countAll(username);
        logAfter("countAll");
        return countResponse;
    }

    @Override
    public CountResponse countAllByIsCompleted(String username, String isCompleted) {
        logBefore("countAllByIsCompleted");
        CountResponse countResponse = todoService.countAllByIsCompleted(username, isCompleted);
        logAfter("countAllByIsCompleted");
        return countResponse;
    }

    private void logBefore(String methodName) {
        logger.info("Before calling " + methodName + " method");
    }

    private void logAfter(String methodName) {
        logger.info("After calling " + methodName + " method");
    }
}
