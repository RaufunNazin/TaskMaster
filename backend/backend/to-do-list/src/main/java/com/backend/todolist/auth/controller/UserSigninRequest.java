package com.backend.todolist.auth.controller;

import com.backend.todolist.auth.factory.AuthRequest;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

public class UserSigninRequest implements AuthRequest {
    private String username;

    private String password;
    
    protected UserSigninRequest() {
    	
    }

	public UserSigninRequest(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public String getPassword() {
		return password;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

    
    
}
