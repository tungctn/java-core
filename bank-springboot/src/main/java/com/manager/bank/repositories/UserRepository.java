package com.manager.bank.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.manager.bank.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // createdAt 
    User findByPhoneNumber(String phoneNumber);

    // register
    boolean existsByEmail(String email);
    boolean existsByPhoneNumber(String phoneNumber);
}
