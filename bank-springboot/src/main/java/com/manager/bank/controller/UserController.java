package com.manager.bank.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manager.bank.config.ApiResponse;
import com.manager.bank.dto.user.CreateRequest;
import com.manager.bank.dto.user.UserDTO;
import com.manager.bank.entities.User;
import com.manager.bank.services.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<User>> createUser(@RequestBody CreateRequest request) {
        User user = userService.createUser(request);
        return ResponseEntity.ok(new ApiResponse<>(true, "User created successfully", user));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDTO>> getProfile(HttpServletRequest request) {
        Integer userId = (Integer) request.getAttribute("userId");
        // Sử dụng userId đã được set từ interceptor
        return ResponseEntity.ok(new ApiResponse<>(true, "Profile fetched successfully", userService.getUser(userId)));
    }
}
