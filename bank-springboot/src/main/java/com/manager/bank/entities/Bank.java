package com.manager.bank.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "banks", uniqueConstraints = {
})
public class Bank extends Base {
    @Id
    @SequenceGenerator(name = "bank_seq", sequenceName = "bank_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "bank_seq")
    private int id;

    @NotBlank(message = "Name is required")
    private String name;
    
    @NotBlank(message = "code is required")
    private String code;

    @NotBlank(message = "logo is required")
    private String logo;

    @NotBlank(message = "shortName is required")
    private String shortName;

    public Bank() {}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

}
