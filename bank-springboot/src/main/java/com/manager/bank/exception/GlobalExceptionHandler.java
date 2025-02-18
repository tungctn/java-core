package com.manager.bank.exception;

import java.sql.SQLIntegrityConstraintViolationException;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.manager.bank.config.ApiResponse;

import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiResponse<String>> handleValidationExceptions(
            ConstraintViolationException ex) {
        String errorMessage = ex.getConstraintViolations()
                              .iterator()
                              .next()
                              .getMessage();
        
        ApiResponse<String> response = new ApiResponse<>(
            false,
            errorMessage,
            null
        );
        
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public ResponseEntity<ApiResponse<String>> handleSQLIntegrityConstraintViolationException(
            SQLIntegrityConstraintViolationException ex) {
        String errorMessage = ex.getMessage();
        ApiResponse<String> response = new ApiResponse<>(
            false,
            errorMessage,
            null
        );
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiResponse<String>> handleDataIntegrityViolation(
            DataIntegrityViolationException ex) {
        String message;
        
        Throwable rootCause = ex.getRootCause();
        if (rootCause instanceof SQLIntegrityConstraintViolationException) {
            String sqlMessage = rootCause.getMessage();
            
            if (sqlMessage.contains("email_unique")) {
                message = "Email already exists";
            } else if (sqlMessage.contains("phoneNumber_unique")) {
                message = "Phone number already exists";
            } else {
                message = "Data already exists in the system";
            }
        } else {
            message = "Error when saving data";
        }
        
        return ResponseEntity.badRequest()
            .body(new ApiResponse<>(false, message, null));
    }
} 
