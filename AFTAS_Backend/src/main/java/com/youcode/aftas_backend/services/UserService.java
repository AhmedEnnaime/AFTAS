package com.youcode.aftas_backend.services;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.youcode.aftas_backend.models.dto.user.UserDTO;
import com.youcode.aftas_backend.models.entities.User;
import com.youcode.aftas_backend.models.enums.ROLE;

public interface UserService extends UserDetailsService {
    User findByUsername(String username);
    UserDTO register(UserDTO userDTO);
    void activate(UserDTO userDTO);
    Boolean upgrade(UserDTO userDTO, ROLE role);
}
