package com.backend.todolist.observer;
import org.springframework.stereotype.Service;

@Service
public class ObserverClient implements TodoObserverInterface {

    @Override
    public void onTodoCreated(String message) {
        System.out.println("Notification: " + message);
    }

    @Override
    public void onTodoUpdated(String message) {
        System.out.println("Notification: " + message);
    }

    @Override
    public void onTodoDeleted(String message) {
        System.out.println("Notification: " + message);
    }

    @Override
    public void onCategoryCreated(String message) {
        System.out.println("Notification: " + message);
    }

    @Override
    public void onTodoMarkCompleted(String message) {
        System.out.println("Notification: " + message);
    }
}
