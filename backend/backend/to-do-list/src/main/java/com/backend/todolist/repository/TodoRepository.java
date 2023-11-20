package com.backend.todolist.repository;

import java.util.List;
import java.util.Optional;

import com.backend.todolist.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.todolist.model.Todo;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
	List<Todo> findAllByUsername(String username);
	List<Todo> findAllByUsernameAndIsCompleted(String username, boolean isCompleted);
	List<Todo> findAllByCategoryAndUsername(Category category, String username);
	Todo findByUsernameAndId(String username, long Id);
	Long countByUsername(String username);
	Long countByUsernameAndIsCompleted(String username, boolean isCompleted);
}
