package com.manager.bank.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.manager.bank.entities.LinkBank;

@Repository
public interface LinkBankRepository extends JpaRepository<LinkBank, Integer> {
    // Lấy danh sách link bank theo userId
    List<LinkBank> findByUserId(Integer userId);

    boolean existsByAccountNumber(String accountNumber);
}
