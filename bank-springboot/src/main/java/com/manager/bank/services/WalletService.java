package com.manager.bank.services;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manager.bank.entities.Wallet;
import com.manager.bank.repositories.WalletRepository;
import com.manager.bank.dto.wallet.WalletResponse;
import com.manager.bank.constants.WalletErrorType;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j // Add Lombok logging
public class WalletService {
    @Autowired
    private WalletRepository walletRepository;

    @Transactional
    public WalletResponse increaseBalance(int walletId, String amount) {
        try {
            Wallet wallet = walletRepository.findById(walletId)
                    .orElseThrow(() -> new RuntimeException("Wallet not found"));

            BigDecimal amountToAdd = new BigDecimal(amount);
            if (amountToAdd.compareTo(BigDecimal.ZERO) <= 0) {
                log.warn("Invalid amount to add: {}", amount);
                return WalletResponse.error("Invalid amount", "INVALID_AMOUNT");
            }

            BigDecimal newBalance = wallet.getBalance().add(amountToAdd);
            wallet.setBalance(newBalance);
            walletRepository.save(wallet);

            return WalletResponse.success(wallet.getBalance(), newBalance);

        } catch (Exception e) {
            log.error("Error increasing balance: {}", e.getMessage());
            return WalletResponse.error("System error", "SYSTEM_ERROR");
        }
    }

    @Transactional
    public WalletResponse decreaseBalance(int walletId, String amount) {
        try {
            Wallet wallet = walletRepository.findById(walletId)
                    .orElseThrow(() -> new RuntimeException("Wallet not found"));
            BigDecimal amountToSubtract = new BigDecimal(amount);
            BigDecimal currentBalance = wallet.getBalance();
            if (currentBalance.compareTo(amountToSubtract) < 0) {
                return WalletResponse.error("Insufficient balance", "INSUFFICIENT_BALANCE");
            }
            BigDecimal newBalance = wallet.getBalance().subtract(amountToSubtract);
            // log newBalance
            log.info("New balance: {}", newBalance);
            wallet.setBalance(newBalance);
            walletRepository.save(wallet);
            return WalletResponse.success(wallet.getBalance(), newBalance);
        } catch (Exception e) {
            log.error("Error decreasing balance: {}", e.getMessage());
            return WalletResponse.error("System error", "SYSTEM_ERROR");
        }
    }

    public Wallet createWallet(Integer userId) {
        Wallet wallet = new Wallet();
        wallet.setUserId(userId);
        wallet.setBalance(BigDecimal.ZERO);
        wallet.setCurrency("VND");
        return walletRepository.save(wallet);
    }

    public Wallet getWalletByUserId(Integer userId) {
        return walletRepository.findByUserId(userId);
    }
}
