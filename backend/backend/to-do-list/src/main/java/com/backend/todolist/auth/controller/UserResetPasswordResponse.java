package com.backend.todolist.auth.controller;

public class UserResetPasswordResponse {
    private String email;
    private String resetToken;

    public UserResetPasswordResponse(String email, String resetToken) {
        this.email = email;
        this.resetToken = resetToken;
    }

    public String getResetToken() {
        return resetToken;
    }

    public void setResetToken(String resetToken) {
        this.resetToken = resetToken;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
