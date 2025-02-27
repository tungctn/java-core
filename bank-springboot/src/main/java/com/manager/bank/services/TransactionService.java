package com.manager.bank.services;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manager.bank.dto.transaction.CreateRequest;
import com.manager.bank.entities.ENUM.TransactionStatus;
import com.manager.bank.entities.Transaction;
import com.manager.bank.repositories.TransactionRepository;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    public Transaction createTransaction(CreateRequest transaction) {
        Transaction newTransaction = new Transaction();
        if (transaction.getToBankId() != 0) {
            newTransaction.setToBankId(transaction.getToBankId());
        }
        if (transaction.getFromBankId() != 0) {
            newTransaction.setFromBankId(transaction.getFromBankId());
        }
        if (transaction.getFromUser() != 0) {
            newTransaction.setFromUser(transaction.getFromUser());
        }
        if (transaction.getToUser() != 0) {
            newTransaction.setToUser(transaction.getToUser());
        }
        newTransaction.setAmount(transaction.getAmount().toString());
        newTransaction.setCurrency(transaction.getCurrency());
        newTransaction.setDescription(transaction.getDescription());
        newTransaction.setTransactionType(transaction.getTransactionType());
        newTransaction.setStatus(transaction.getStatus());
        return transactionRepository.save(newTransaction);
    }

    public List<Transaction> getListTransaction(Integer userId) {
        List<Transaction> transactionToUser = transactionRepository.findByToUser(userId);
        List<Transaction> transactionFromUser = transactionRepository.findByFromUser(userId);
        if (transactionToUser.isEmpty() && transactionFromUser.isEmpty()) {
            return new ArrayList<>();
        }

        List<Transaction> transactions = new ArrayList<>(transactionToUser);
        transactions.addAll(transactionFromUser);
        transactions.sort(Comparator.comparing(
                Transaction::getCreatedAt).reversed());
        return transactions;
    }

    public Map<String, Object> getOverviewTransaction(Integer userId) {
        List<Transaction> transactionFromUser = transactionRepository.findByFromUser(userId);
        List<Transaction> transactionToUser = transactionRepository.findByToUser(userId);

        // Tính tổng số giao dịch
        int totalTransactions = transactionFromUser.size() + transactionToUser.size();

        // Tính tổng tiền ra (từ người dùng)
        double totalOutgoing = transactionFromUser.stream()
                .mapToDouble(t -> Double.parseDouble(t.getAmount()))
                .sum();

        // Tính tổng tiền vào (đến người dùng)
        double totalIncoming = transactionToUser.stream()
                .mapToDouble(t -> Double.parseDouble(t.getAmount()))
                .sum();

        // Tỉ lệ giao dịch thanh công
        List<Transaction> transactions = new ArrayList<>(transactionToUser);
        transactions.addAll(transactionFromUser);
        double successRate = (transactions.stream()
                .filter(t -> t.getStatus().equals(TransactionStatus.COMPLETED))
                .count() / (double) totalTransactions) * 100;

        // Tạo map chứa thông tin tổng quan
        Map<String, Object> summaryMap = new HashMap<>();
        summaryMap.put("totalTransactions", totalTransactions);
        summaryMap.put("totalOutgoing", totalOutgoing);
        summaryMap.put("totalIncoming", totalIncoming);
        summaryMap.put("successRate", successRate);

        return summaryMap;
    }
}
