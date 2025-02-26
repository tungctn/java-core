package com.manager.bank.repositories;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.manager.bank.entities.Transaction;

@Repository
public interface TransactionRepository extends BaseRepository<Transaction, Integer> {
    List<Transaction> findByToUser(Integer userId);
    List<Transaction> findByFromUser(Integer userId);
    List<Transaction> findByToBankId(Integer bankId);
    List<Transaction> findByFromBankId(Integer bankId);
}
