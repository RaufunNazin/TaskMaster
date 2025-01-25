package com.backend.todolist.auth.controller;

import com.backend.todolist.auth.factory.AuthRequestFactory;

public class SigninRequestFactory implements AuthRequestFactory {
    private String username;

    private String password;
    
    protected SigninRequestFactory() {
    	
    }

	public SigninRequestFactory(String username, String password) {
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
