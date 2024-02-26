package com.youcode.aftas_backend.services.Impl;

import java.util.Collections;

import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.youcode.aftas_backend.exceptions.AlreadyActiveException;
import com.youcode.aftas_backend.exceptions.ResourceNotFoundException;
import com.youcode.aftas_backend.models.dto.user.UserDTO;
import com.youcode.aftas_backend.models.entities.User;
import com.youcode.aftas_backend.models.enums.ROLE;
import com.youcode.aftas_backend.repositories.UserRepository;
import com.youcode.aftas_backend.security.JWTService;
import com.youcode.aftas_backend.security.dto.AuthRequestDTO;
import com.youcode.aftas_backend.security.dto.AuthResponseDTO;
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
    private final JWTService jwtService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        log.debug("Entering in loadUserByUsername Method...");
        User user = findByUsername(username);
        if (!user.isEnabled()) {
            throw new DisabledException("User account is not enabled");
        }
        log.info("User Authenticated Successfully..!!!");
        return new org.springframework.security.core.userdetails.User(
            user.getUsername(),
            user.getPassword(),
            Collections.singletonList(new SimpleGrantedAuthority(user.getRole().name()))
        );
    }

    @Override
    public User findByUsername(String username) {
       return userRepository.findByUsername(username)
                            .orElseThrow(() -> new UsernameNotFoundException("could not found user..!!"));
    }

    @Override
    public UserDTO register(UserDTO userDTO) {
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        userDTO.setRole(ROLE.MEMBER);
        var saveUser = userRepository.save(
            mapper.map(userDTO, User.class)
        );
        // userRepository.updateDType();
        return mapper.map(
                saveUser,
                UserDTO.class
        );
    }

    @Override
    @Transactional
    public Boolean activate(String username) {
        User user = findByUsername(username);
        if (user == null)
            throw new ResourceNotFoundException("User with username " + username + " not found");
        if (user.isEnabled())
            throw new AlreadyActiveException("This account is already active");
        userRepository.enableAccount(user.getUsername());
        return true;
    }

    @Override
    @Transactional
    public Boolean upgrade(String username, ROLE role) {
        User user = findByUsername(username);
        if (user == null)
            throw new ResourceNotFoundException("User with username " + username + " not found");
        if (!user.isEnabled())
            throw new AlreadyActiveException("This account is not active");
        userRepository.upgradeUserRole(user.getUsername(), role);
        return true;
    }

    @Override
    public AuthResponseDTO login(AuthRequestDTO login) {
        var user = loadUserByUsername(login.getUsername());
        if(passwordEncoder.matches(login.getPassword(), user.getPassword())){
            String token = jwtService.GenerateToken(user);
            String username = user.getUsername();
            User userData = userRepository.findByUsername(username).get();
            Integer userId = userData.getId();
            return AuthResponseDTO.builder().accessToken(token).userId(userId).username(username).role(userData.getRole().name()).build();
        }
        throw new InsufficientAuthenticationException("unauthorized");
    }
    
}
