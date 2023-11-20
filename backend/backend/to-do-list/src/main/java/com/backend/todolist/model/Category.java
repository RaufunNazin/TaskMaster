package com.backend.todolist.model;

import com.backend.todolist.auth.model.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;

    private String username;

    @NotEmpty(message = "Title is required")
    private String title;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("category")
    private Set<Todo> todos = new HashSet<>();

    public Category() {

    }

    public Category(String username, String title) {
        this.username = username;
        this.title = title;
    }

    public Long getId() {
        return categoryId;
    }

    public void setId(Long categoryId) {
        this.categoryId = categoryId;
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

    public Set<Todo> getTodos() {
        return todos;
    }

    public void setTodos(Set<Todo> todos) {
        this.todos = todos;
    }

}