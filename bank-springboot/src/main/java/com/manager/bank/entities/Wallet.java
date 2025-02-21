package com.manager.bank.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotBlank;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
@Table(name = "wallets", uniqueConstraints = {
        @UniqueConstraint(columnNames = "stk")
}, indexes = {
        @Index(name = "idx_stk", columnList = "stk")
})
public class Wallet extends Base {
    @Id
    @SequenceGenerator(name = "wallet_seq", sequenceName = "wallet_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "wallet_seq")
    private int id;

    @NotBlank(message = "userId is required")
    private Integer userId;

    @NotBlank(message = "currency is required")
    private String currency;

    @NotBlank(message = "balance is required")
    private String balance;

    @NotBlank(message = "bankId is required")
    private Integer bankId;

    @NotBlank(message = "status is required")
    private String status;

    public Wallet() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getBalance() {
        return balance;
    }

    public void setBalance(String balance) {
        this.balance = balance;
    }

    public Integer getBankId() {
        return bankId;
    }

    public void setBankId(Integer bankId) {
        this.bankId = bankId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
