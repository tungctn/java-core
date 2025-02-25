package com.manager.bank.dto.transaction;

import java.math.BigDecimal;

import com.manager.bank.entities.ENUM.TransactionStatus;
import com.manager.bank.entities.ENUM.TransactionType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateRequest {
    private Integer fromUser;
    private Integer toUser;
    private String amount;
    private String currency;
    private String description;
    private TransactionType transactionType;
    private TransactionStatus status;
    private int toBankId;
    private int fromBankId;
}
