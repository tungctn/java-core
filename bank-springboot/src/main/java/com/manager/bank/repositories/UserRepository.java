package com.manager.bank.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import com.manager.bank.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    // createdAt 
}
