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

    @NotBlank(message = "stk is required")
    @Column(unique = true)
    private String stk;

    @NotBlank(message = "bankId is required")
    @ManyToOne
    @JoinColumn(name = "bank_id", nullable = false) // Khóa ngoại
    private Bank bank;

    @NotBlank(message = "userId is required")
    private int userId;

    @NotBlank(message = "balance is required")
    private String balance;

    public Wallet() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStk() {
        return stk;
    }   

    public void setStk(String stk) {
        this.stk = stk;
    }

    public Bank getBank() {
        return bank;
    }

    public void setBank(Bank bank) {
        this.bank = bank;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getBalance() {
        return balance;
    }

    public void setBalance(String balance) {
        this.balance = balance;
    }
}
