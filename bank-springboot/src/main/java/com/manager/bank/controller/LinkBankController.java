package com.manager.bank.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manager.bank.config.ApiResponse;
import com.manager.bank.dto.linkBank.LinkBankRequest;
import com.manager.bank.entities.LinkBank;
import com.manager.bank.services.LinkBankService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/link-bank")
public class LinkBankController {
    @Autowired
    private LinkBankService linkBankService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<LinkBank>> createLinkBank(@RequestBody LinkBankRequest request, HttpServletRequest httpRequest) {
        Integer userId = (Integer) httpRequest.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body(new ApiResponse<>(false, "Unauthorized", null));
        }
        
        try {
            LinkBank newLinkBank = linkBankService.createLinkBank(request, userId);
            return ResponseEntity.ok(new ApiResponse<>(true, "Link bank created successfully", newLinkBank));
        } catch (org.springframework.dao.DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ApiResponse<>(false, "Account number already exists", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse<>(false, "Error creating link bank: " + e.getMessage(), null));
        }
    }
}
