package com.manager.bank.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manager.bank.config.ApiResponse;
import com.manager.bank.dto.user.ChangePasswordRequest;
import com.manager.bank.dto.user.CreateRequest;
import com.manager.bank.dto.user.UpdateRequest;
import com.manager.bank.dto.user.UserDTO;
import com.manager.bank.entities.User;
import com.manager.bank.services.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDTO>> getProfile(HttpServletRequest request) {
        Integer userId = (Integer) request.getAttribute("userId");
        // Sử dụng userId đã được set từ interceptor
        return ResponseEntity.ok(new ApiResponse<>(true, "Profile fetched successfully", userService.getUser(userId)));
    }

    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse<User>> changePassword(@RequestBody ChangePasswordRequest request, HttpServletRequest httpRequest) {
        Integer userId = (Integer) httpRequest.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse<>(false, "Unauthorized", null));
        }
        userService.changePassword(userId, request.getNewPassword());
        return ResponseEntity.ok(new ApiResponse<>(true, "Password changed successfully", null));
    }

    // update profile
    @PostMapping("/update-profile")
    public ResponseEntity<ApiResponse<UserDTO>> updateProfile(@RequestBody UpdateRequest request, HttpServletRequest httpRequest) {
        Integer userId = (Integer) httpRequest.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse<>(false, "Unauthorized", null));
        }
        UserDTO updatedUser = userService.UpdateUser(userId, request);
        return ResponseEntity.ok(new ApiResponse<>(true, "Profile changed successfully", updatedUser));
    }
}
