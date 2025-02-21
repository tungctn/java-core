package com.manager.bank.repositories;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.manager.bank.entities.Bank;
import com.manager.bank.entities.Wallet;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, Integer> {
    // createAt
    // List<Wallet> findByBank(Bank bank);
}
