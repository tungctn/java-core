package com.manager.bank.model;

public class DatabaseInfo {
    private String message;
    private String databaseUrl;

    public DatabaseInfo(String message, String databaseUrl) {
        this.message = message;
        this.databaseUrl = databaseUrl;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getDatabaseUrl() {
        return databaseUrl;
    }

    public void setDatabaseUrl(String databaseUrl) {
        this.databaseUrl = databaseUrl;
    }
}
