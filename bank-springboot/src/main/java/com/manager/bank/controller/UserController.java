package com.manager.bank.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manager.bank.config.ApiResponse;
import com.manager.bank.dto.user.CreateRequest;
import com.manager.bank.entities.User;
import com.manager.bank.services.UserService;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/users")
    public ResponseEntity<ApiResponse<User>> createUser(@RequestBody CreateRequest request) {
        User user = userService.createUser(request);
        return ResponseEntity.ok(new ApiResponse<>(true, "User created successfully", user));
    }
}
