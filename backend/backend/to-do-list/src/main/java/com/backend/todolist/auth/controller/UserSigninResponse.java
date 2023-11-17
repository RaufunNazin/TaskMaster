package com.backend.todolist.auth.controller;

public class UserSigninResponse {
	private String username;

	private String email;
	private String token;
	
	protected UserSigninResponse() {
		
	}
	
	public UserSigninResponse(String username, String email, String token) {
		super();
		this.username = username;
		this.email = email;
		this.token = token;
	}

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

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
	
	
}
