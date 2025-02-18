package com.manager.bank.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manager.bank.dto.user.CreateRequest;
import com.manager.bank.entities.User;
import com.manager.bank.services.UserService;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/users")
    public User createUser(@RequestBody CreateRequest request) {
        return userService.createUser(request);
    }
}
