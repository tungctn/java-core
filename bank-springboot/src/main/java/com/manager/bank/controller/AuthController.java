package com.manager.bank.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manager.bank.config.ApiResponse;
import com.manager.bank.config.SecurityConfig;
import com.manager.bank.dto.auth.LoginRequest;
import com.manager.bank.dto.auth.RegisterRequest;
import com.manager.bank.entities.User;
import com.manager.bank.repositories.UserRepository;
import com.manager.bank.services.JwtService;
import com.manager.bank.services.UserService;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SecurityConfig securityConfig;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Map<String, Object>>> login(@RequestBody LoginRequest request) {
        User user = userService.getUserByPhoneNumber(request.getPhoneNumber());
        if (user == null) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, "User not found", null));
        }
        if (!securityConfig.comparePassword(request.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, "Invalid password", null));
        }
        return ResponseEntity.ok(new ApiResponse<>(true, "Login successful", Map.of(
            "token", jwtService.generateToken(user)
        )));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<String>> register(@RequestBody RegisterRequest request) {
        User user = userRepository.findByPhoneNumberOrEmail(request.getPhoneNumber(), request.getEmail());
        if (user != null) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Email or PhoneNumber already", null));
        }
        userService.createUser(request);
        return ResponseEntity.ok(new ApiResponse<>(true, "User registered successfully", null));
    }

    
}
