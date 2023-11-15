package com.backend.todolist.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.todolist.auth.model.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}