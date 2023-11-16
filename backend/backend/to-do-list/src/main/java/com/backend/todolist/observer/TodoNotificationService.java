package com.backend.todolist.observer;
import org.springframework.stereotype.Service;

@Service
public class TodoNotificationService implements TodoObserver{

    @Override
    public void onTodoCreated(String message) {
        System.out.println("Notification: " + message);
    }
}
