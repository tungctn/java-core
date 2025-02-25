package com.manager.bank.interceptors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.manager.bank.services.JwtService;
import com.manager.bank.config.ApiResponse;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import lombok.extern.slf4j.Slf4j;
import java.io.IOException;

@Component
@Slf4j
public class AuthInterceptor implements HandlerInterceptor {
    @Autowired
    private JwtService jwtService;
    @Autowired
    private ObjectMapper objectMapper;  

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        try {
            String token = request.getHeader("Authorization");
            if (token == null || !token.startsWith("Bearer ")) {
                sendErrorResponse(response, "No token provided", HttpStatus.UNAUTHORIZED);
                return false;
            }
            
            // Validate token
            String actualToken = token.substring(7);
            Integer userId = jwtService.getUserIdFromToken(actualToken);
            
            // Set attribute
            request.setAttribute("userId", userId);
            return true;
            
        } catch (ExpiredJwtException e) {
            log.error("JWT expired: {}", e.getMessage());
            sendErrorResponse(response, "Token has expired", HttpStatus.UNAUTHORIZED);
            return false;
            
        } catch (JwtException e) {
            log.error("Invalid JWT: {}", e.getMessage());
            sendErrorResponse(response, "Invalid token", HttpStatus.UNAUTHORIZED);
            return false;
            
        } catch (Exception e) {
            log.error("Auth error: {}", e.getMessage());
            sendErrorResponse(response, "Authentication failed", HttpStatus.INTERNAL_SERVER_ERROR);
            return false;
        }
    }

    private void sendErrorResponse(HttpServletResponse response, String message, HttpStatus status) throws IOException {
        response.setStatus(status.value());
        response.setContentType("application/json");
        
        ApiResponse<String> apiResponse = new ApiResponse<>(false, message, null);
        String jsonResponse = objectMapper.writeValueAsString(apiResponse);
        
        response.getWriter().write(jsonResponse);
    }
} 