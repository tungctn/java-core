package com.manager.bank.entities;

import org.springframework.stereotype.Component;

@Component
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

    public enum LinkBankStatus {
        PENDING, COMPLETED, FAILED
    }
}
