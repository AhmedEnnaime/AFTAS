package com.youcode.aftas_backend.services;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.youcode.aftas_backend.models.entities.User;

public interface UserService extends UserDetailsService {
    User findByUsername(String username);
}
