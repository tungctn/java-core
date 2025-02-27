package com.manager.bank.dto.wallet;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransferRequest {
    private int fromUserId;
    private int toUserId;
    private BigDecimal amount;
}
