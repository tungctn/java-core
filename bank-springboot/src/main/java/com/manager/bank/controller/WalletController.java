package com.manager.bank.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manager.bank.config.ApiResponse;
import com.manager.bank.dto.transaction.CreateRequest;
import com.manager.bank.dto.wallet.DepositRequest;
import com.manager.bank.dto.wallet.TransferRequest;
import com.manager.bank.dto.wallet.WithdrawRequest;
import com.manager.bank.entities.LinkBank;
import com.manager.bank.entities.Wallet;
import com.manager.bank.repositories.WalletRepository;
import com.manager.bank.services.BankService;
import com.manager.bank.services.LinkBankService;
import com.manager.bank.services.TransactionService;
import com.manager.bank.services.WalletService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.manager.bank.entities.ENUM;

@RestController
@RequestMapping("/api/wallet")
public class WalletController {
    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private BankService bankService;

    @Autowired
    private LinkBankService linkBankService;

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/withdraw")
    public ResponseEntity<ApiResponse<String>> withdraw(@RequestBody WithdrawRequest request,
            HttpServletRequest httpRequest) {
        Integer userId = (Integer) httpRequest.getAttribute("userId");
        Wallet wallet = walletRepository.findByUserId(userId);
        LinkBank linkBank = linkBankService.getLinkBankById(request.getLinkBankId());
        if (wallet == null) {
            return ResponseEntity.ok(new ApiResponse<>(false, "Wallet not found", null));
        }
        CreateRequest createRequest = new CreateRequest();
        createRequest.setAmount(request.getAmount());
        createRequest.setFromUser(userId);
        createRequest.setToBankId(linkBank.getId());
        createRequest.setCurrency(wallet.getCurrency());
        createRequest.setDescription("Withdraw " + request.getAmount() + " " + wallet.getCurrency() + " to " + linkBank.getAccountName() + "-" + linkBank.getAccountNumber());
        createRequest.setTransactionType(ENUM.TransactionType.WITHDRAW);
        createRequest.setStatus(ENUM.TransactionStatus.COMPLETED);
        transactionService.createTransaction(createRequest);
        return ResponseEntity.ok(new ApiResponse<>(true, "Withdraw successful", null));
    }

    @PostMapping("/deposit")
    public ResponseEntity<ApiResponse<String>> deposit(@RequestBody DepositRequest request, HttpServletRequest httpRequest) {
        Integer userId = (Integer) httpRequest.getAttribute("userId");
        Wallet wallet = walletRepository.findByUserId(userId);
        LinkBank linkBank = linkBankService.getLinkBankById(request.getLinkBankId());
        if (wallet == null) {
            return ResponseEntity.ok(new ApiResponse<>(false, "Wallet not found", null));
        }
        CreateRequest createRequest = new CreateRequest();
        createRequest.setAmount(request.getAmount());
        createRequest.setFromUser(userId);
        createRequest.setToBankId(linkBank.getId());
        createRequest.setCurrency(wallet.getCurrency());
        createRequest.setDescription("Deposit " + request.getAmount() + " " + wallet.getCurrency() + " from " + linkBank.getAccountName() + "-" + linkBank.getAccountNumber());
        createRequest.setTransactionType(ENUM.TransactionType.DEPOSIT);
        createRequest.setStatus(ENUM.TransactionStatus.COMPLETED);
        transactionService.createTransaction(createRequest);
        return ResponseEntity.ok(new ApiResponse<>(true, "Deposit successful", null));
    }

    @PostMapping("/transfer")
    public ResponseEntity<ApiResponse<String>> transfer(@RequestBody TransferRequest request, HttpServletRequest httpRequest) {
        Integer userId = (Integer) httpRequest.getAttribute("userId");
        Wallet wallet = walletRepository.findByUserId(userId);
        if (wallet == null) {
            return ResponseEntity.ok(new ApiResponse<>(false, "Wallet not found", null));
        }
        CreateRequest createRequest = new CreateRequest();
        // createRequest.setAmount(request.getAmount());
        // createRequest.setFromUser(userId);
        // createRequest.setToBankId(request.getToBankId());
        // createRequest.setCurrency(wallet.getCurrency());
        // createRequest.setDescription("Transfer " + request.getAmount() + " " + wallet.getCurrency() + " to " + request.getToBankId());
        return ResponseEntity.ok(new ApiResponse<>(true, "Transfer successful", null));
    }

}
