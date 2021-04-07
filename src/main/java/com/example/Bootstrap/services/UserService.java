package com.example.Bootstrap.services;

import com.example.Bootstrap.models.User;
import com.example.Bootstrap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final EntityManager em;

    @Autowired
    public UserService(UserRepository userRepository, EntityManager em) {
        this.userRepository = userRepository;
        this.em = em;
    }


    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return userRepository.findByUsername(s);
    }


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUser(Long id) {
        return userRepository.getOne(id);
    }

    @Transactional
    public void update(User user) {
        em.merge(user);
    }

    public void remove(Long id) {
        userRepository.deleteById(id);
    }

    @Transactional
    public void addUser(User user) {
        em.persist(user);
    }
}
