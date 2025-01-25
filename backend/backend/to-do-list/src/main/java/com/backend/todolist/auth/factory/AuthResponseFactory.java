package com.backend.todolist.auth.factory;

public interface AuthResponseFactory {
    AuthResponse createResponse(AuthRequestFactory authRequestFactory);

}

