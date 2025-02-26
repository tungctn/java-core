package com.manager.bank.repositories;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import com.manager.bank.entities.Base;

@NoRepositoryBean
public interface BaseRepository<T extends Base, ID extends Serializable> extends JpaRepository<T, ID> {
    // Các phương thức chung cho tất cả các repository
} 