package com.backend.todolist.auth.controller;

import com.backend.todolist.auth.factory.AuthResponse;

public class UserSignupResponse implements AuthResponse {
	private String username;

	private String email;
	private String token;
	
	protected UserSignupResponse() {
		
	}
	
	public UserSignupResponse(String username, String email, String token) {
		super();
		this.username = username;
		this.email = email;
		this.token = token;
	}

	@Override
	public String getUsername() {
		return username;
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

	@Override
	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
	
	
}
