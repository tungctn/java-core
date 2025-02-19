package com.manager.bank.entities;

import com.manager.bank.entities.ENUM.TransactionStatus;
import com.manager.bank.entities.ENUM.TransactionType;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "transactions", uniqueConstraints = {
}, indexes = {
    @Index(name = "idx_transaction_id", columnList = "id"),
    @Index(name = "idx_transaction_fromUser", columnList = "fromUser"),
    @Index(name = "idx_transaction_toUser", columnList = "toUser"),
    @Index(name = "idx_transaction_transactionType", columnList = "transactionType"),
    @Index(name = "idx_transaction_status", columnList = "status")
})
public class Transaction extends Base {
    @Id
    @SequenceGenerator(name = "transaction_seq", sequenceName = "transaction_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "transaction_seq")
    private int id;

    @NotBlank(message = "fromUser is required")
    private int fromUser;

    @NotBlank(message = "toUser is required")
    private int toUser;

    @NotBlank(message = "amount is required")
    private String amount;

    @NotBlank(message = "currency is required")
    private String currency;

    @NotBlank(message = "description is required")
    private String description;

    @Enumerated(EnumType.STRING)
    private TransactionType transactionType = TransactionType.TRANSFER;

    @Enumerated(EnumType.STRING)
    private TransactionStatus status = TransactionStatus.PENDING;

    public Transaction() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getfromUser() {
        return fromUser;
    }

    public void setfromUser(int fromUser) {
        this.fromUser = fromUser;
    }

    public int gettoUser() {
        return toUser;
    }

    public void settoUser(int toUser) {
        this.toUser = toUser;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TransactionType getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(TransactionType transactionType) {
        this.transactionType = transactionType;
    }

    public TransactionStatus getStatus() {
        return status;
    }

    public void setStatus(TransactionStatus status) {
        this.status = status;
    }
} 
