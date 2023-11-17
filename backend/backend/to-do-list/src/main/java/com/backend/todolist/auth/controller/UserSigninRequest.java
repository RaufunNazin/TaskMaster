package com.backend.todolist.auth.controller;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

public class UserSigninRequest {
    private String username;

	@NotEmpty(message = "Email is required")
	@Email(message = "Please provide a valid email")
	private String email;
    private String password;
    
    protected UserSigninRequest() {
    	
    }

	public UserSigninRequest(String username, String email, String password) {
		super();
		this.username = username;
		this.email = email;
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
    
    
}
