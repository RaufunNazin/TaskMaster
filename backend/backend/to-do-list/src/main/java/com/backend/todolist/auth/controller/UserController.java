package com.backend.todolist.auth.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import com.backend.todolist.auth.model.User;
import org.mapstruct.Context;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.backend.todolist.auth.jwt.JwtTokenGenerator;
import com.backend.todolist.auth.repository.UserRepository;
import com.backend.todolist.auth.service.UserResponseService;
import com.backend.todolist.errorhandler.CustomException;

import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true")
@ApiResponses(value = {
		@ApiResponse(code=400, message = "Bad Request", response = CustomException.class),
		@ApiResponse(code=401, message = "Unauthorized", response = CustomException.class),
		@ApiResponse(code=403, message = "Forbidden", response = CustomException.class),
		@ApiResponse(code=404, message = "Not Found", response = CustomException.class)
})
public class UserController {	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
    PasswordEncoder passwordEncoder;
    
	@Autowired
    JwtTokenGenerator jwtTokenGenerator;
    
	@Autowired
    UserRepository userRepository;
	
	@Autowired
	UserResponseService userResponseService;

	@ResponseStatus(code = HttpStatus.OK)
	@RequestMapping(value = "/api/auth/signin", method = RequestMethod.POST)
    public ResponseEntity<UserSigninResponse> signin(@Valid @RequestBody UserSigninRequest userSigninRequest) {
		return new ResponseEntity<>(userResponseService.createSignInResponse(userSigninRequest), HttpStatus.OK);
    }

	@ResponseStatus(code = HttpStatus.OK)
	@RequestMapping(value = "/api/auth/signup", method = RequestMethod.POST)
    public ResponseEntity<UserSignupResponse> signup(@Valid @RequestBody UserSignupRequest userSignupRequest) {
		return new ResponseEntity<>(userResponseService.createSignUpResponse(userSignupRequest), HttpStatus.OK);
    }

	@ResponseStatus(code = HttpStatus.OK)
	@RequestMapping(value = "/api/auth/reset-password", method = RequestMethod.POST)
	public ResponseEntity<UserResetPasswordResponse> resetPassword(@Valid @RequestBody UserResetPasswordRequest resetPasswordRequest) {
		return new ResponseEntity<>(userResponseService.createResetPasswordResponse(resetPasswordRequest), HttpStatus.OK);
	}

}
