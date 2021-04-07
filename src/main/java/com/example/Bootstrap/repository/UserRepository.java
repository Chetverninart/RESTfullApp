package com.example.Bootstrap.repository;

import com.example.Bootstrap.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

    List<User> findAll();

    User getOne(Long id);

    void deleteById(Long id);

}