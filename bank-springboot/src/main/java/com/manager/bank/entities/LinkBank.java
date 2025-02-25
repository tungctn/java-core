package com.manager.bank.entities;

import com.manager.bank.entities.ENUM.LinkBankStatus;

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
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "link_banks", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"account_number"})
}, indexes = {
    @Index(columnList = "account_number")
})
public class LinkBank extends Base {
    @Id
    @SequenceGenerator(name = "link_bank_seq", sequenceName = "link_bank_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "link_bank_seq")
    private int id;

    @NotNull(message = "User ID không được để trống")
    private int userId;
    
    @NotNull(message = "Bank ID không được để trống")
    private int bankId;

    @NotBlank(message = "accountNumber is required")
    @Column(unique = true)
    private String accountNumber;

    @NotBlank(message = "accountName is required")
    private String accountName;

    @Enumerated(EnumType.STRING)
    public LinkBankStatus status = LinkBankStatus.PENDING;

    public LinkBank() {}
        
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getBankId() {
        return bankId;
    }

    public void setBankId(int bankId) {
        this.bankId = bankId;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public LinkBankStatus getStatus() {
        return status;
    }

    public void setStatus(LinkBankStatus status) {
        this.status = status;
    }
}
