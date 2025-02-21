package com.manager.bank.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "link_banks", uniqueConstraints = {
})
public class LinkBank extends Base {
    @Id
    @SequenceGenerator(name = "link_bank_seq", sequenceName = "link_bank_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "link_bank_seq")
    private int id;

    @NotBlank(message = "userId is required")
    private String userId;
    
    @NotBlank(message = "bankId is required")
    private String bankId;

    @NotBlank(message = "accountNumber is required")
    private String accountNumber;

    @NotBlank(message = "accountName is required")
    private String accountName;

    @NotBlank(message = "status is required")
    private String status;

    public LinkBank() {}
        
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getBankId() {
        return bankId;
    }

    public void setBankId(String bankId) {
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
