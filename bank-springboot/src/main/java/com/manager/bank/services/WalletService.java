package com.manager.bank.services;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manager.bank.entities.ENUM;
import com.manager.bank.entities.Wallet;
import com.manager.bank.repositories.WalletRepository;

import jakarta.transaction.Transactional;

@Service
public class WalletService {
    @Autowired
    private WalletRepository walletRepository;

    // Tăng số dư
    @Transactional
    public void increaseBalance(int walletId, String amount) {
        Wallet wallet = walletRepository.findById(walletId)
                .orElseThrow(() -> new RuntimeException("Wallet not found"));

        // Chuyển balance từ String -> BigDecimal
        BigDecimal currentBalance = new BigDecimal(wallet.getBalance());
        BigDecimal amountToAdd = new BigDecimal(amount);

        // Cộng số tiền mới vào số dư hiện tại
        BigDecimal newBalance = currentBalance.add(amountToAdd);

        // Cập nhật lại balance (chuyển về String trước khi lưu)
        wallet.setBalance(newBalance.toString());
        walletRepository.save(wallet);
    }

    // Giảm số dư
    @Transactional
    public void decreaseBalance(int walletId, String amount) {
        Wallet wallet = walletRepository.findById(walletId)
                .orElseThrow(() -> new RuntimeException("Wallet not found"));

        // Chuyển balance từ String -> BigDecimal
        BigDecimal currentBalance = new BigDecimal(wallet.getBalance());
        BigDecimal amountToSubtract = new BigDecimal(amount);

        // Trừ số tiền mới vào số dư hiện tại
        BigDecimal newBalance = currentBalance.subtract(amountToSubtract);

        // Cập nhật lại balance (chuyển về String trước khi lưu)
        wallet.setBalance(newBalance.toString());
        walletRepository.save(wallet);
    }

    public Wallet createWallet(Integer userId) {
        Wallet wallet = new Wallet();
        wallet.setUserId(userId);
        wallet.setBalance("0");
        wallet.setCurrency("VND");
        return walletRepository.save(wallet);
    }
}
