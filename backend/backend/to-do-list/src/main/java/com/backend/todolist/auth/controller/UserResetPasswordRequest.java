package com.backend.todolist.auth.controller;

/**
 * ResetPasswordRequest POJO will be used to send Password  Request params from REST-API by the user.
 */
public class UserResetPasswordRequest {

    private String token ;
    private  String email;
    private  String newPassword ;


    public UserResetPasswordRequest() {
        // TODO Auto-generated constructor stub
    }


    public UserResetPasswordRequest(String token, String email, String newPassword) {
        super();
        this.token = token;
        this.email = email;
        this.newPassword = newPassword;
    }


    public String getToken() {
        return token;
    }


    public void setToken(String token) {
        this.token = token;
    }


    public String getEmail() {
        return email;
    }


    public void setEmail(String email) {
        this.email = email;
    }



    public String getNewPassword() {
        return newPassword;
    }


    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }



}
