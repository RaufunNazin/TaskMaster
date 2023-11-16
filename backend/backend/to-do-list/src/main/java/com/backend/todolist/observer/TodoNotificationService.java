package com.backend.todolist.observer;

public class TodoNotificationService implements TodoObserver{

    @Override
    public void onTodoCreated(String message) {
        System.out.println("Notification: " + message);
    }
}
