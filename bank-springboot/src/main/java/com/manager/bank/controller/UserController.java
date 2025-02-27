package com.manager.bank.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.manager.bank.config.ApiResponse;
import com.manager.bank.dto.user.ChangePasswordRequest;
import com.manager.bank.dto.user.UpdateRequest;
import com.manager.bank.dto.user.UserDTO;
import com.manager.bank.entities.User;
import com.manager.bank.entities.Wallet;
import com.manager.bank.services.LinkBankService;
import com.manager.bank.services.TransactionService;
import com.manager.bank.services.UserService;
import com.manager.bank.services.WalletService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private WalletService walletService;
    @Autowired
    private LinkBankService linkBankService;
    @Autowired
    private TransactionService transactionService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getProfile(HttpServletRequest request) {
        // Sử dụng userId đã được set từ interceptor
        Integer userId = (Integer) request.getAttribute("userId");

        // Lấy thông tin về wallet
        Wallet wallet = walletService.getWalletByUserId(userId);

        // Lấy thoong tin về link bank
        List<Object> linkBanks = linkBankService.getLinkBankByUserId(userId);

        // Lấy thông tin tổng quan giao dịch
        Map<String, Object> overviewTransaction = transactionService.getOverviewTransaction(userId);
        return ResponseEntity
                .ok(new ApiResponse<>(true, "Profile fetched successfully", Map.of("info", userService.getUser(userId),
                        "wallet", wallet, "linkBanks", linkBanks, "overviewTransaction", overviewTransaction)));
    }

    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse<User>> changePassword(@RequestBody ChangePasswordRequest request,
            HttpServletRequest httpRequest) {
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
    public ResponseEntity<ApiResponse<UserDTO>> updateProfile(@RequestBody UpdateRequest request,
            HttpServletRequest httpRequest) {
        Integer userId = (Integer) httpRequest.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse<>(false, "Unauthorized", null));
        }
        UserDTO updatedUser = userService.UpdateUser(userId, request);
        return ResponseEntity.ok(new ApiResponse<>(true, "Profile changed successfully", updatedUser));
    }

    // search user
    @GetMapping("/search-phone-number")
    public ResponseEntity<ApiResponse<Map<String, Object>>> searchUser(@RequestParam String phoneNumber) {
        User user = userService.getUserByPhoneNumber(phoneNumber);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(false, "User not found", null));
        }
        return ResponseEntity.ok(new ApiResponse<>(true, "User found", Map.of("user", new UserDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getRole()))));
    }
}
