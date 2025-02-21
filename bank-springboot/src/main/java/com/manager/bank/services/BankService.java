package com.manager.bank.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manager.bank.entities.Bank;
import com.manager.bank.repositories.BankRepository;

@Service
public class BankService {
    @Autowired
    private BankRepository bankRepository;

    public Bank getBankById(int id) {
        return bankRepository.findById(id).orElse(null);
    }

    public Bank createBank(Bank bank) {
        return bankRepository.save(bank);
    }
}
