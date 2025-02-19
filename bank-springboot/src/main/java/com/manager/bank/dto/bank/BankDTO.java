package com.manager.bank.dto.bank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BankDTO {
    private Integer id;
    private String name;
    private String code;
    private String shortName;
    private String logo;
}
