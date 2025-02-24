package com.manager.bank.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manager.bank.config.ApiResponse;
import com.manager.bank.entities.Transaction;
import com.manager.bank.services.TransactionService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/transactions")
public class TransationController {
    @Autowired
    private TransactionService transactionService;

    @GetMapping("/list")
    public ResponseEntity<ApiResponse<List<Transaction>>> getListTransaction(HttpServletRequest request) {
        Integer userId = (Integer) request.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse<>(false, "Unauthorized", null));
        }
        List<Transaction> transactions = transactionService.getListTransaction(userId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Transaction list", transactions));
    }
}
