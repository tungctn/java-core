package com.manager.bank.dto.transaction;

import com.manager.bank.entities.ENUM.TransactionStatus;
import com.manager.bank.entities.ENUM.TransactionType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateRequest {
    private int fromUser;
    private int toUser;
    private int toBankId;
    private int fromBankId;
    private String amount;
    private String currency;
    private String description;
    private TransactionType transactionType;
    private TransactionStatus status;
}
