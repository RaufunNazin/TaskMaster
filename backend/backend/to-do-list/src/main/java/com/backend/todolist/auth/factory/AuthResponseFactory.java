package com.backend.todolist.auth.factory;

import com.backend.todolist.auth.controller.*;

public interface AuthResponseFactory {
    AuthResponse createResponse(AuthRequest authRequest);

}

