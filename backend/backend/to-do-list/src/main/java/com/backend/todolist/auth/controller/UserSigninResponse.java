package com.backend.todolist.auth.controller;

import com.backend.todolist.auth.factory.AuthResponse;

public class UserSigninResponse implements AuthResponse {
	private String username;

	private String token;
	
	protected UserSigninResponse() {
		
	}
	
	public UserSigninResponse(String username, String token) {
		super();
		this.username = username;
		this.token = token;
	}

	@Override
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Override
	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
	
	
}
