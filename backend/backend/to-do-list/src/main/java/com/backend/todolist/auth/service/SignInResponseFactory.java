package com.backend.todolist.auth.service;

import com.backend.todolist.auth.controller.SigninRequestFactory;
import com.backend.todolist.auth.controller.SigninResponse;
import com.backend.todolist.auth.factory.AuthRequestFactory;
import com.backend.todolist.auth.factory.AuthResponse;
import com.backend.todolist.auth.factory.AuthResponseFactory;
import com.backend.todolist.auth.jwt.JwtTokenGenerator;
import com.backend.todolist.auth.repository.CategoryRepository;
import com.backend.todolist.auth.repository.PasswordResetTokenRepository;
import com.backend.todolist.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SignInResponseFactory  implements AuthResponseFactory {
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
    public AuthResponse createResponse(AuthRequestFactory authRequestFactory) {
        if (authRequestFactory instanceof SigninRequestFactory) {
            SigninRequestFactory userSigninRequest = (SigninRequestFactory) authRequestFactory;
            try {
                String username = userSigninRequest.getUsername();
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, userSigninRequest.getPassword()));
                String token = jwtTokenGenerator.createToken(username, this.userRepository.findByUsername(username).getRoleAsList());

                return new SigninResponse(username, token);
            } catch (AuthenticationException e) {
                throw new BadCredentialsException("Invalid username/password");
            }
        } else {
            // Handle unsupported request type or throw an exception
            throw new IllegalArgumentException("Unsupported request type");
        }
    }
}
