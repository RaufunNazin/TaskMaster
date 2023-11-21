package com.backend.todolist.auth.service;

import com.backend.todolist.auth.controller.UserSigninRequest;
import com.backend.todolist.auth.controller.UserSignupRequest;
import com.backend.todolist.auth.controller.UserSignupResponse;
import com.backend.todolist.auth.factory.AuthRequest;
import com.backend.todolist.auth.factory.AuthResponse;
import com.backend.todolist.auth.factory.AuthResponseFactory;
import com.backend.todolist.auth.jwt.JwtTokenGenerator;
import com.backend.todolist.auth.model.User;
import com.backend.todolist.auth.repository.CategoryRepository;
import com.backend.todolist.auth.repository.PasswordResetTokenRepository;
import com.backend.todolist.auth.repository.UserRepository;
import com.backend.todolist.errorhandler.BadRequestException;
import com.backend.todolist.model.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class SignUpResponseFactory implements AuthResponseFactory {
    @Autowired
    UserRepository userRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenGenerator jwtTokenGenerator;

    @Autowired
    PasswordResetTokenRepository passwordResetTokenRepository;
    @Override
    public AuthResponse createResponse(AuthRequest authRequest) {
        if (authRequest instanceof UserSignupRequest) {
            UserSignupRequest userSignupRequest = (UserSignupRequest) authRequest;
            try {
                String username = userSignupRequest.getUsername();
                String email = userSignupRequest.getEmail();
                String password = userSignupRequest.getPassword();

                User user =  userRepository.findByUsernameOrEmail(username, email);
                if(user != null) {
                    throw new BadRequestException("User already exists with this username/email");
                }

                User _user = new User(username, email, passwordEncoder.encode(password));
                _user = userRepository.save(_user);
                // Create default categories for the user
                Category important = new Category();
                important.setTitle("Important");
                important.setUsername(username);

                Category personal = new Category();
                personal.setTitle("Personal");
                personal.setUsername(username);

                Category work = new Category();
                work.setTitle("Work");
                work.setUsername(username);

                categoryRepository.saveAll(Arrays.asList(important, personal, work));

                String token = jwtTokenGenerator.createToken(_user.getUsername(), _user.getRoleAsList());

                return new UserSignupResponse(username, email, token);
            } catch (AuthenticationException e) {
                throw new BadCredentialsException("Invalid username/password");
            }
        } else {
            // Handle unsupported request type or throw an exception
            throw new IllegalArgumentException("Unsupported request type");
        }
    }
}
