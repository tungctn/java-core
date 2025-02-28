package com.manager.bank.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manager.bank.dto.bank.BankDTO;
import com.manager.bank.dto.bank.CreateRequest;
import com.manager.bank.entities.Bank;
import com.manager.bank.repositories.BankRepository;

@RestController
@RequestMapping("/api/banks")
public class BankController {
    private final BankRepository bankRepository;

    public BankController(BankRepository bankRepository) {
        this.bankRepository = bankRepository;
    }

    @PostMapping("/create")
    public void createBank(@RequestBody CreateRequest request) {
        for (BankDTO bank : request.getBanks()) {
            Bank newBank = new Bank();
            newBank.setName(bank.getName());
            newBank.setCode(bank.getCode());
            newBank.setLogo(bank.getLogo());
            newBank.setShortName(bank.getShortName());

            bankRepository.save(newBank);
        }
    }

    @GetMapping("/list")
    public List<Bank> getBanks() {
        return bankRepository.findAll();
    }
}
