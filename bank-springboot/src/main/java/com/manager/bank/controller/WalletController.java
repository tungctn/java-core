package com.manager.bank.controller;

import java.math.BigDecimal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;

import com.manager.bank.config.ApiResponse;
import com.manager.bank.dto.transaction.CreateRequest;
import com.manager.bank.dto.wallet.*;
import com.manager.bank.entities.LinkBank;
import com.manager.bank.entities.Wallet;
import com.manager.bank.entities.ENUM;
import com.manager.bank.repositories.WalletRepository;
import com.manager.bank.services.*;

@RestController
@RequestMapping("/api/wallet")
public class WalletController {

    @Autowired private WalletRepository walletRepository;
    @Autowired private BankService bankService;
    @Autowired private LinkBankService linkBankService;
    @Autowired private TransactionService transactionService;
    @Autowired private WalletService walletService;

    @Transactional
    @PostMapping("/withdraw")
    public ResponseEntity<ApiResponse<String>> withdraw(@RequestBody WithdrawRequest request, HttpServletRequest httpRequest) {
        Integer userId = (Integer) httpRequest.getAttribute("userId");
        Wallet wallet = validateWallet(userId);
        LinkBank linkBank = linkBankService.getLinkBankById(request.getLinkBankId());

        if (wallet == null) return ResponseEntity.ok(new ApiResponse<>(false, "Wallet not found", null));

        // Trừ số dư trước khi tạo transaction
        WalletResponse walletResponse = walletService.decreaseBalance(userId, request.getAmount().toString());
        if (!walletResponse.isSuccess()) return ResponseEntity.ok(new ApiResponse<>(false, walletResponse.getMessage(), null));

        wallet.setBalance(walletResponse.getCurrentBalance());
        walletRepository.save(wallet);

        // Transaction chính: Rút tiền từ ví đến ngân hàng
        String descriptionWithdrawFromWallet = "Withdraw " + request.getAmount() + " " + wallet.getCurrency() + " to " + linkBank.getAccountName() + "-" + linkBank.getAccountNumber();
        createTransaction(userId, 0, linkBank.getBankId(), 0, wallet.getCurrency(), request.getAmount(), ENUM.TransactionType.WITHDRAW, descriptionWithdrawFromWallet);

        // Transaction phụ: Trừ tiền từ tài khoản ví
        // String descriptionDecreaBalance = "Decrease balance " + request.getAmount() + " " + wallet.getCurrency();
        // createTransaction(userId, 0, 0, linkBank.getBankId(), wallet.getCurrency(), request.getAmount(), ENUM.TransactionType.WITHDRAW, descriptionDecreaBalance);

        return ResponseEntity.ok(new ApiResponse<>(true, "Withdraw successful", null));
    }

    @Transactional
    @PostMapping("/deposit")
    public ResponseEntity<ApiResponse<String>> deposit(@RequestBody DepositRequest request, HttpServletRequest httpRequest) {
        Integer userId = (Integer) httpRequest.getAttribute("userId");
        Wallet wallet = validateWallet(userId);
        LinkBank linkBank = linkBankService.getLinkBankById(request.getLinkBankId());

        if (wallet == null) return ResponseEntity.ok(new ApiResponse<>(false, "Wallet not found", null));

        // Cộng số dư trước khi tạo transaction
        WalletResponse walletResponse = walletService.increaseBalance(userId, request.getAmount().toString());
        if (!walletResponse.isSuccess()) return ResponseEntity.ok(new ApiResponse<>(false, walletResponse.getMessage(), null));

        wallet.setBalance(walletResponse.getCurrentBalance());
        walletRepository.save(wallet);

        // Transaction chính: Nạp tiền từ ngân hàng vào ví
        String descriptionDepositToWallet = "Deposit " + request.getAmount() + " " + wallet.getCurrency() + " from " + linkBank.getAccountName() + "-" + linkBank.getAccountNumber();
        createTransaction(userId, 0, linkBank.getBankId(), 0, wallet.getCurrency(), request.getAmount(), ENUM.TransactionType.DEPOSIT, descriptionDepositToWallet);   

        // Transaction phụ: Cộng tiền vào tài khoản ví
        // String descriptionIncreaseBalance = "Increase balance " + request.getAmount() + " " + wallet.getCurrency();
        // createTransaction(userId, 0, 0, linkBank.getBankId(), wallet.getCurrency(), request.getAmount(), ENUM.TransactionType.DEPOSIT, descriptionIncreaseBalance);

        return ResponseEntity.ok(new ApiResponse<>(true, "Deposit successful", null));
    }

    @Transactional
    @PostMapping("/transfer")
    public ResponseEntity<ApiResponse<String>> transfer(@RequestBody TransferRequest request, HttpServletRequest httpRequest) {
        Integer fromUserId = (Integer) httpRequest.getAttribute("userId");
        Wallet fromWallet = validateWallet(fromUserId);
        Wallet toWallet = validateWallet(request.getToUserId());

        if (fromWallet == null || toWallet == null) return ResponseEntity.ok(new ApiResponse<>(false, "Wallet not found", null));

        // Trừ số dư từ người gửi
        WalletResponse fromResponse = walletService.decreaseBalance(fromUserId, request.getAmount().toString());
        if (!fromResponse.isSuccess()) return ResponseEntity.ok(new ApiResponse<>(false, fromResponse.getMessage(), null));

        fromWallet.setBalance(fromResponse.getCurrentBalance());
        walletRepository.save(fromWallet);

        // Cộng số dư vào người nhận
        WalletResponse toResponse = walletService.increaseBalance(request.getToUserId(), request.getAmount().toString());
        if (!toResponse.isSuccess()) return ResponseEntity.ok(new ApiResponse<>(false, toResponse.getMessage(), null));

        toWallet.setBalance(toResponse.getCurrentBalance());
        walletRepository.save(toWallet);

        // Transaction chính: Gửi tiền từ người gửi đến người nhận
        String descriptionTransfer = "Transfer " + request.getAmount() + " " + fromWallet.getCurrency() + " to " + toWallet.getCurrency();
        createTransaction(fromUserId, request.getToUserId(), 0, 0, fromWallet.getCurrency(), request.getAmount().toString(), ENUM.TransactionType.TRANSFER, descriptionTransfer);

        // Transaction phụ: Trừ tiền từ tài khoản người gửi
        // String descriptionDecreaBalance = "Decrease balance " + request.getAmount() + " " + fromWallet.getCurrency();
        // createTransaction(fromUserId, 0, 0, 0, fromWallet.getCurrency(), request.getAmount().negate().toString(), ENUM.TransactionType.TRANSFER, descriptionDecreaBalance);

        // Transaction phụ: Cộng tiền vào tài khoản người nhận
        String descriptionIncreaseBalance = "Increase balance " + request.getAmount() + " " + toWallet.getCurrency();
        createTransaction(request.getToUserId(), 0, 0, 0, toWallet.getCurrency(), request.getAmount().toString(), ENUM.TransactionType.TRANSFER, descriptionIncreaseBalance);

        return ResponseEntity.ok(new ApiResponse<>(true, "Transfer successful", null));
    }

    private Wallet validateWallet(Integer userId) {
        return walletRepository.findByUserId(userId);
    }

    private void createTransaction(Integer fromUser, Integer toUser, Integer fromBankId, Integer toBankId, String currency, String amount, ENUM.TransactionType type, String description) {
        CreateRequest createRequest = new CreateRequest();
        createRequest.setAmount(amount);
        createRequest.setFromUser(fromUser);
        createRequest.setToUser(toUser);
        createRequest.setCurrency(currency);
        createRequest.setDescription(description);
        createRequest.setTransactionType(type);
        createRequest.setStatus(ENUM.TransactionStatus.COMPLETED);
        createRequest.setFromBankId(fromBankId);
        createRequest.setToBankId(toBankId);
        transactionService.createTransaction(createRequest);
    }
}
