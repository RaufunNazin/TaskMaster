package com.backend.todolist.observer;

import java.util.ArrayList;
import java.util.List;

public class TodoSubject {
    private List<TodoObserver> observers = new ArrayList<>();

    public void addObserver(TodoObserver observer) {
        observers.add(observer);
    }

    public void removeObserver(TodoObserver observer) {
        observers.remove(observer);
    }

    public void createTodo(String taskName) {

        // Notify all observers about the new task creation
        notifyObservers("Task has been created: " + taskName);
    }

    private void notifyObservers(String message) {
        for (TodoObserver observer : observers) {
            observer.onTodoCreated(message);
        }
    }
}
