package com.backend.todolist.auth.controller;

import com.backend.todolist.auth.factory.AuthResponse;
import com.backend.todolist.auth.jwt.JwtTokenGenerator;
import com.backend.todolist.auth.repository.UserRepository;
import com.backend.todolist.auth.service.SignInResponseFactory;
import com.backend.todolist.auth.service.SignUpResponseFactory;
import com.backend.todolist.errorhandler.CustomException;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

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
    SignUpResponseFactory signUpResponseFactory;

    @Autowired
    SignInResponseFactory signInResponseFactory;

	@ResponseStatus(code = HttpStatus.OK)
	@RequestMapping(value = "/api/auth/signin", method = RequestMethod.POST)
    public ResponseEntity<AuthResponse> signin(@Valid @RequestBody UserSigninRequest userSigninRequest) {
		return new ResponseEntity<>(signInResponseFactory.createResponse(userSigninRequest), HttpStatus.OK);
    }

	@ResponseStatus(code = HttpStatus.OK)
	@RequestMapping(value = "/api/auth/signup", method = RequestMethod.POST)
    public ResponseEntity<AuthResponse> signup(@Valid @RequestBody UserSignupRequest userSignupRequest) {
		return new ResponseEntity<>(signUpResponseFactory.createResponse(userSignupRequest), HttpStatus.OK);
    }

//	@ResponseStatus(code = HttpStatus.OK)
//	@RequestMapping(value = "/api/auth/reset-password", method = RequestMethod.POST)
//	public ResponseEntity<UserResetPasswordResponse> resetPassword(@Valid @RequestBody UserResetPasswordRequest resetPasswordRequest) {
//		return new ResponseEntity<>(userResponseService.createResetPasswordResponse(resetPasswordRequest), HttpStatus.OK);
//	}

}
