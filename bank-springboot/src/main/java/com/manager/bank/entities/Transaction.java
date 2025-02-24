package com.manager.bank.entities;

import com.manager.bank.entities.ENUM.TransactionStatus;
import com.manager.bank.entities.ENUM.TransactionType;

import jakarta.annotation.Nullable;
import jakarta.persistence.Column;
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
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    @Nullable
    @Column(nullable = true)
    private Integer fromUser = 0;

    @Nullable
    @Column(nullable = true)
    private Integer toUser = 0;

    @Nullable
    @Column(nullable = true)
    private Integer toBankId = 0;

    @Nullable
    @Column(nullable = true)
    private Integer fromBankId = 0;

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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getFromUser() {
        return fromUser;
    }

    public void setFromUser(Integer fromUser) {
        this.fromUser = fromUser;
    }

    public Integer getToUser() {
        return toUser;
    }

    public void setToUser(Integer toUser) {
        this.toUser = toUser;
    }

    public Integer getToBankId() {
        return toBankId;
    }

    public void setToBankId(Integer toBankId) {
        this.toBankId = toBankId;
    }

    public Integer getFromBankId() {
        return fromBankId;
    }

    public void setFromBankId(Integer fromBankId) {
        this.fromBankId = fromBankId;
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
