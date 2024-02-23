package com.youcode.aftas_backend.services.Impl;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.youcode.aftas_backend.exceptions.AlreadyActiveException;
import com.youcode.aftas_backend.exceptions.ResourceNotFoundException;
import com.youcode.aftas_backend.models.dto.user.UserDTO;
import com.youcode.aftas_backend.models.entities.User;
import com.youcode.aftas_backend.models.enums.ROLE;
import com.youcode.aftas_backend.repositories.UserRepository;
import com.youcode.aftas_backend.services.UserService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper mapper;
    private final PasswordEncoder passwordEncoder;

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

    @Override
    public UserDTO register(UserDTO userDTO) {
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        return mapper.map(
                userRepository.save(
                    mapper.map(userDTO, User.class)
                ),
                UserDTO.class
        );
    }

    @Override
    public Boolean activate(UserDTO userDTO) {
        User user = findByUsername(userDTO.getUsername());
        if (user == null)
            throw new ResourceNotFoundException("User with id " + userDTO.getId() + " not found");
        if (user.isEnabled())
            throw new AlreadyActiveException("This account is already active");
        userRepository.enableAccount(user.getUsername());
        return true;
    }

    @Override
    public Boolean upgrade(UserDTO userDTO, ROLE role) {
        User user = findByUsername(userDTO.getUsername());
        if (user == null)
            throw new ResourceNotFoundException("User with id " + userDTO.getId() + " not found");
        if (!user.isEnabled())
            throw new AlreadyActiveException("This account is not active");
        userRepository.upgradeUserRole(user.getUsername(), role);
        return true;
    }
    
}
