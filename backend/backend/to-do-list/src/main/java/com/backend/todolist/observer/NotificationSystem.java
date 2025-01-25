package com.backend.todolist.observer;

import java.util.ArrayList;
import java.util.List;

public class NotificationSystem {
    private List<TodoObserverInterface> observers = new ArrayList<>();

    public void addObserver(TodoObserverInterface observer) {
        observers.add(observer);
    }

    public void removeObserver(TodoObserverInterface observer) {
        observers.remove(observer);
    }

    public void createTodo(String taskName) {

        // Notify all observers about the new task creation
        notifyObservers("Task has been created: " + taskName);
    }

    public void updateTodo(){
        notifyObservers("Task updated");
    }

    public void deleteTodo(){
        notifyObservers("Task deleted");
    }

    public void createCategory(){
        notifyObservers("Category created");
    }

    public void markAsComplete(String taskName){
        notifyObservers("Task : " + taskName + " completed");
    }

    private void notifyObservers(String message) {
        for (TodoObserverInterface observer : observers) {
            observer.onTodoCreated(message);
            observer.onCategoryCreated(message);
            observer.onTodoDeleted(message);
            observer.onTodoUpdated(message);
            observer.onTodoMarkCompleted(message);
        }
    }
}
