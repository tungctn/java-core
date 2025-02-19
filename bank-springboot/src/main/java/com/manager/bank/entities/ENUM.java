package com.manager.bank.entities;

public class ENUM {
    public enum Role {
        ADMIN,
        USER
    }

    public enum TransactionType {
        DEPOSIT, WITHDRAW, TRANSFER
    }

    public enum TransactionStatus {
        PENDING, COMPLETED, FAILED
    }
}
