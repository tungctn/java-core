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

    public int getFromUserId() {
        return fromUserId;
    }

    public int getToUserId() {
        return toUserId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setFromUserId(int fromUserId) {
        this.fromUserId = fromUserId;
    }

    public void setToUserId(int toUserId) {
        this.toUserId = toUserId;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}
