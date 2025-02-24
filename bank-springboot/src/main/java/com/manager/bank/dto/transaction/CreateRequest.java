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
    private int fromUser;
    private int toUser;
    private int toBankId;
    private int fromBankId;
    private BigDecimal amount;
    private String currency;
    private String description;
    private TransactionType transactionType;
    private TransactionStatus status;
    public void setAmount(String string) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setAmount'");
    }
}
