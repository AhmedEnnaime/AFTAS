package com.youcode.aftas_backend.services;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.youcode.aftas_backend.models.dto.user.UserDTO;
import com.youcode.aftas_backend.models.entities.User;
import com.youcode.aftas_backend.models.enums.ROLE;
import com.youcode.aftas_backend.security.dto.AuthRequestDTO;
import com.youcode.aftas_backend.security.dto.AuthResponseDTO;

public interface UserService extends UserDetailsService {
    User findByUsername(String username);
    UserDTO register(UserDTO userDTO);
    Boolean activate(String username);
    Boolean upgrade(String username, ROLE role);
    AuthResponseDTO login(AuthRequestDTO login);
}
