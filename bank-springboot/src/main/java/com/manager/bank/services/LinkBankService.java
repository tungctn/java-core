package com.manager.bank.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manager.bank.dto.linkBank.LinkBankRequest;
import com.manager.bank.entities.LinkBank;
import com.manager.bank.entities.Bank;
import com.manager.bank.entities.ENUM;
import com.manager.bank.repositories.LinkBankRepository;

@Service
public class LinkBankService {
    @Autowired
    private LinkBankRepository linkBankRepository;

    @Autowired
    private BankService bankService;

    // liên kết ngân hàng
    public LinkBank createLinkBank(LinkBankRequest request, Integer userId) {
        // Kiểm tra xem accountNumber đã tồn tại chưa
        if (linkBankRepository.existsByAccountNumber(request.getAccountNumber())) {
            throw new RuntimeException("Account number already exists");
        }
        
        LinkBank newLinkBank = new LinkBank();
        newLinkBank.setUserId(userId);
        newLinkBank.setAccountName(request.getAccountName().trim().toUpperCase());
        newLinkBank.setAccountNumber(request.getAccountNumber().trim());
        newLinkBank.setBankId(request.getBankId());

        LinkBank linkBank = linkBankRepository.save(newLinkBank);
        if (linkBank != null) {
            linkBank.setStatus(ENUM.LinkBankStatus.COMPLETED);
            linkBankRepository.save(linkBank);
        }
        return linkBank;
    }

    public List<Object> getLinkBankByUserId(int userId) {
        List<LinkBank> linkBanks = linkBankRepository.findByUserId(userId);
        List<Object> banks = new ArrayList<>();

        for (LinkBank linkBank : linkBanks) {
            Bank bank = bankService.getBankById(linkBank.getBankId());
            if(bank != null) {
                Map<String, Object> bankInfo = new HashMap<>();
                bankInfo.put("id", linkBank.getId());
                bankInfo.put("name", bank.getShortName());
                bankInfo.put("logoUrl", bank.getLogo());
                bankInfo.put("accountNumber", linkBank.getAccountNumber());
                banks.add(bankInfo);
            }
        }
        return banks;
    }

    public LinkBank getLinkBankById(int id) {
        return linkBankRepository.findById(id).orElse(null);
    }
}
