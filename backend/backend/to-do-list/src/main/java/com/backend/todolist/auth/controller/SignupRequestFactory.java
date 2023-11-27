package com.backend.todolist.auth.controller;

import com.backend.todolist.auth.factory.AuthRequestFactory;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class SignupRequestFactory implements AuthRequestFactory {
	@NotEmpty(message = "Username is required")
	@Column(unique = true)
    private String username;

	@NotEmpty(message = "Email is required")
	@Email(message = "Please provide a valid email")
	@Column(unique = true)
	private String email;
    
    @NotEmpty(message = "Password is required")
    @Size(min=8, message = "Password length should be 8 characters or more")
    private String password;
    
    protected SignupRequestFactory() {
    	
    }

	public SignupRequestFactory(String username, String email, String password) {
		super();
		this.username = username;
		this.email = email;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setPassword(String password) {
		this.password = password;
	}
    
    
}
