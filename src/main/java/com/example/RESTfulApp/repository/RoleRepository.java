package com.example.RESTfulApp.repository;

import com.example.RESTfulApp.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
