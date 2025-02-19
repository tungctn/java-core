package com.manager.bank.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.manager.bank.entities.Bank;

@Repository
public interface BankRepository extends JpaRepository<Bank, Integer> {
    // 
}