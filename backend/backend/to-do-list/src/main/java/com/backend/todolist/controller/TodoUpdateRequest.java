package com.backend.todolist.controller;

import com.backend.todolist.model.Category;

import java.util.Date;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class TodoUpdateRequest {
	@NotEmpty(message = "Title is required")
	private String title;

	private String description;

	private Date targetDate;



	private Category category;
	
	protected TodoUpdateRequest() {
		
	}

	public TodoUpdateRequest(String title, String description, Date targetDate, Category category) {
		super();
		this.title = title;
		this.description = description;
		this.targetDate = targetDate;
		this.category = category;
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

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}
}
