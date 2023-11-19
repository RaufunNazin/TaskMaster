package com.backend.todolist.controller;

import com.backend.todolist.model.Category;

import java.util.Date;
import java.util.Set;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class TodoCreateRequest {
	@NotEmpty(message = "Title is required")
	private String title;

	private String description;

	@NotNull(message = "Target date is required")
	private Date targetDate;

	private Set<Category> categories;
	
	protected TodoCreateRequest() {
		
	}

	public TodoCreateRequest(String title, String description, Date targetDate, Set<Category> categories) {
		super();
		this.title = title;
		this.description = description;
		this.targetDate = targetDate;
		this.categories = categories;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getTargetDate() {
		return targetDate;
	}

	public void setTargetDate(Date targetDate) {
		this.targetDate = targetDate;
	}

	public Set<Category> getCategories() {
		return categories;
	}

	public void setCategories(Set<Category> categories) {
		this.categories = categories;
	}
}
