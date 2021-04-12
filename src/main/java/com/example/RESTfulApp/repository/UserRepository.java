package com.example.RESTfulApp.repository;

import com.example.RESTfulApp.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

    List<User> findAll();

    User getOne(Long id);

    Optional<User> findById(Long id);

    void deleteById(Long id);

}
