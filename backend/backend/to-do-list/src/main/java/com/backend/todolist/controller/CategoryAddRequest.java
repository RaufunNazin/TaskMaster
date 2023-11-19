package com.backend.todolist.controller;

import javax.validation.constraints.NotEmpty;

public class CategoryAddRequest {
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @NotEmpty(message = "Title is required")
    private String title;

    protected CategoryAddRequest(){

    }

    public CategoryAddRequest(String title){
        super();
        this.title = title;
    }

}
