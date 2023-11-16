package com.backend.todolist.observer;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class TodoNotificationService implements TodoObserver{
//    private final SimpMessagingTemplate messagingTemplate;
//
//    public TodoNotificationService(SimpMessagingTemplate messagingTemplate) {
//        this.messagingTemplate = messagingTemplate;
//    }

    @Override
    public void onTodoCreated(String message) {
        System.out.println("Notification: " + message);
//        messagingTemplate.convertAndSend("/todo/notifications", message);
    }
}
