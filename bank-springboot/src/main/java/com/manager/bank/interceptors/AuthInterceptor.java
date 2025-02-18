package com.manager.bank.interceptors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.manager.bank.services.JwtService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthInterceptor implements HandlerInterceptor {
    @Autowired
    private JwtService jwtService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String token = request.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            throw new RuntimeException("No token provided");
        }
        
        // Validate token
        String actualToken = token.substring(7);
        Integer userId = jwtService.getUserIdFromToken(actualToken);
        
        // Set attribute để controller có thể sử dụng
        request.setAttribute("userId", userId);
        
        return true; // cho phép request tiếp tục
    }
} 