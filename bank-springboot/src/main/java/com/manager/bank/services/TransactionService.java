package com.manager.bank.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manager.bank.dto.transaction.CreateRequest;
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
        newTransaction.setAmount(transaction.getAmount());
        newTransaction.setCurrency(transaction.getCurrency());
        newTransaction.setDescription(transaction.getDescription());
        newTransaction.setTransactionType(transaction.getTransactionType());
        newTransaction.setStatus(transaction.getStatus());
        return transactionRepository.save(newTransaction);
    }
}
