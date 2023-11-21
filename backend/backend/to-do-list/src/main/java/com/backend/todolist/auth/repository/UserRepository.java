package com.backend.todolist.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.todolist.auth.model.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    User findByUsernameAndEmail(String username, String email);
    User findByUsernameOrEmail(String username, String email);
    User findByEmail(String email);
}