package com.manager.bank.dto.bank;

import java.util.List;

public class CreateRequest {
    List<BankDTO> banks;

    public List<BankDTO> getBanks() {
        return banks;
    }
    public void setBanks(List<BankDTO> banks) {
        this.banks = banks;
    }
}
