package com.backend.todolist.controller;

import javax.persistence.Column;
import javax.validation.constraints.NotEmpty;

public class CategoryAddRequest {

    @NotEmpty(message = "Title is required")
    @Column(unique = true)
    private String title;

    protected CategoryAddRequest(){

    }

    public CategoryAddRequest(String title){
        super();
        this.title = title;
    }
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


}
