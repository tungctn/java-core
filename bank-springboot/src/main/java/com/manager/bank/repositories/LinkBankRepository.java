package com.manager.bank.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.manager.bank.entities.LinkBank;

@Repository
public interface LinkBankRepository extends JpaRepository<LinkBank, Integer> {
    // 
}
