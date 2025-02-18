package com.manager.bank.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manager.bank.entities.DatabaseInfo;

import java.sql.Connection;
import java.sql.DriverManager;

@RestController
@RequestMapping("/api")
public class DatabaseController {

    @Value("${spring.datasource.url}")
    private String databaseUrl;

    @Value("${spring.datasource.username}")
    private String databaseUser;

    @Value("${spring.datasource.password}")
    private String databasePassword;

    @GetMapping("/dbtest")
    public DatabaseInfo testDatabaseConnection() {
        try {
            Connection conn = DriverManager.getConnection(databaseUrl, databaseUser, databasePassword);
            if (conn != null) {
                conn.close();
                return new DatabaseInfo("Database connection is successful!", databaseUrl);
            }
        } catch (Exception e) {
            return new DatabaseInfo("Database connection failed: " + e.getMessage(), databaseUrl);
        }
        return new DatabaseInfo("Database connection failed for an unknown reason", databaseUrl);
    }
}
