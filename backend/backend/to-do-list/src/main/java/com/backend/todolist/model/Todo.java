package com.backend.todolist.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
public class Todo {
	
	@Id
	@GeneratedValue
	private long id;
	
	@NotEmpty(message = "Title is required")
	private String title;

	private String description = "";

	@NotNull(message = "Target date is required")
	private Date targetDate;
	
	private String username;
	
	private boolean isCompleted;
	
	protected Todo() {
		
	}
	
	public Todo(String title, String description, Date targetDate, String username) {
		super();
		this.title = title;
		this.description = description;
		this.targetDate = targetDate;
		this.username = username;
		this.isCompleted = false;
	}
	
	public long getId() {
		return id;
	}

	public void setIdd(long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
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

	public boolean getIsCompleted() {
		return isCompleted;
	}

	public void setIsCompleted(boolean isCompleted) {
		this.isCompleted = isCompleted;
	}

	@Override
	public String toString() {
		return "Todo [id=" + id + ", title=" + title + ", targetDate=" + targetDate + ", username=" + username
				+ ", isCompleted=" + isCompleted + "]";
	}
	
}
