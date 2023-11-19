package com.backend.todolist.auth.service;

import com.backend.todolist.auth.controller.*;
import com.backend.todolist.auth.jwt.JwtTokenGenerator;
import com.backend.todolist.auth.model.PasswordResetToken;
import com.backend.todolist.auth.model.User;
import com.backend.todolist.auth.repository.PasswordResetTokenRepository;
import com.backend.todolist.auth.repository.UserRepository;
import com.backend.todolist.errorhandler.BadRequestException;
import com.backend.todolist.errorhandler.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.UUID;

@Service
public class UserResponseService {
	@Autowired
    UserRepository userRepository;
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
    PasswordEncoder passwordEncoder;

	@Autowired
	JwtTokenGenerator jwtTokenGenerator;

	@Autowired
	PasswordResetTokenRepository passwordResetTokenRepository;

	private JavaMailSender emailSender;

	
	public UserSignupResponse createSignUpResponse(UserSignupRequest userSignupRequest) {
		try {
			String username = userSignupRequest.getUsername();
			String email = userSignupRequest.getEmail();
	        String password = userSignupRequest.getPassword();
	        
	        User user =  userRepository.findByUsername(username);
	        if(user != null) {
	        	throw new BadRequestException("Username already exists");
	        }
	        
	        User _user = new User(username, email, passwordEncoder.encode(password));
	        _user = userRepository.save(_user);
	        
	        String token = jwtTokenGenerator.createToken(_user.getUsername(), _user.getRoleAsList());
	        
			return new UserSignupResponse(username, email, token);
		} catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username/password");
        }
	}
	
	public UserSigninResponse createSignInResponse(UserSigninRequest userSigninRequest) {
		try {
			String username = userSigninRequest.getUsername();
			String email = userSigninRequest.getEmail();
	        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, userSigninRequest.getPassword()));
	        String token = jwtTokenGenerator.createToken(username, this.userRepository.findByUsername(username).getRoleAsList());
	        
			return new UserSigninResponse(username, email, token);
		} catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username/password");
        }
	}

	public UserResetPasswordResponse createResetPasswordResponse(UserResetPasswordRequest userResetPasswordRequest){
		try {
			String email = userResetPasswordRequest.getEmail();
			User user = userRepository.findByEmail(email);
			if (user == null) {
				throw new UserNotFoundException("User not found");
			}

            String token = UUID.randomUUID().toString();
			PasswordResetToken passwordResetToken = new PasswordResetToken(user, token);
			passwordResetTokenRepository.save(passwordResetToken);
			sendResetTokenEmail(email, token);
			return new UserResetPasswordResponse(email, token);
		} catch (AuthenticationException e){
			throw new RuntimeException("Failed to initiate password reset process");
		}
	}

	private void sendResetTokenEmail(String recipientEmail, String token) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(recipientEmail);
		message.setSubject("Password Reset Token");
//		message.setText("Your password reset token is: " + token);
//		emailSender.send(message);
	}

}
