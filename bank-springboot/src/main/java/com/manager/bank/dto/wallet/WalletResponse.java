package com.manager.bank.dto.wallet;
import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class WalletResponse {
    private boolean success;
    private String message;
    private String errorType;  // INSUFFICIENT_BALANCE, INVALID_AMOUNT, SYSTEM_ERROR
    private BigDecimal currentBalance;
    private BigDecimal newBalance;
    
    public static WalletResponse success(BigDecimal currentBalance, BigDecimal newBalance) {
        return WalletResponse.builder()
                .success(true)
                .message("Transaction successful")
                .currentBalance(currentBalance)
                .newBalance(newBalance)
                .build();
    }
    
    public static WalletResponse error(String message, String errorType) {
        return WalletResponse.builder()
                .success(false)
                .message(message)
                .errorType(errorType)
                .build();
    }
}