package com.manager.bank.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manager.bank.dto.linkBank.LinkBankRequest;
import com.manager.bank.entities.LinkBank;
import com.manager.bank.entities.ENUM;
import com.manager.bank.repositories.LinkBankRepository;

@Service
public class LinkBankService {
    @Autowired
    private LinkBankRepository linkBankRepository;

    // liên kết ngân hàng
    public LinkBank createLinkBank(LinkBankRequest request, Integer userId) {
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
}
