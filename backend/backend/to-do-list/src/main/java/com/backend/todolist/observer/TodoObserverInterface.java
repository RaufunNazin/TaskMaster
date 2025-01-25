package com.backend.todolist.observer;

public interface TodoObserverInterface {
    void onTodoCreated(String message);
    void onTodoUpdated(String message);
    void onTodoDeleted(String message);
    void onCategoryCreated(String message);
    void onTodoMarkCompleted(String message);
}
