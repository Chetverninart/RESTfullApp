package com.example.SpringBootCRUD.repository;

import com.example.SpringBootCRUD.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
