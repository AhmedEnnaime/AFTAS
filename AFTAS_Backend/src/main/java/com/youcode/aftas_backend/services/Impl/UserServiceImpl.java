package com.youcode.aftas_backend.services.Impl;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.youcode.aftas_backend.models.entities.User;
import com.youcode.aftas_backend.repositories.UserRepository;
import com.youcode.aftas_backend.services.UserService;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        log.debug("Entering in loadUserByUsername Method...");
        User user = findByUsername(username);
        log.info("User Authenticated Successfully..!!!");
        return user;
    }

    @Override
    public User findByUsername(String username) {
       return userRepository.findByUsername(username)
                            .orElseThrow(() -> new UsernameNotFoundException("could not found user..!!"));
    }
    
}
