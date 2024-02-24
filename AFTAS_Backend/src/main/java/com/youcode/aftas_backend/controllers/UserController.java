package com.youcode.aftas_backend.controllers;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.youcode.aftas_backend.models.dto.user.UserDTO;
import com.youcode.aftas_backend.models.enums.ROLE;
import com.youcode.aftas_backend.services.UserService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "api/users", produces = MediaType.APPLICATION_JSON_VALUE)
@Validated
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/activate/{username}")
    //@PreAuthorize("hasAnyAuthority('MANAGER')")
    public ResponseEntity<Boolean> activateAccount(@PathVariable String username) {
        return ResponseEntity.ok(userService.activate(username));
    }

    @PostMapping("/upgrade/{role}")
    @PreAuthorize("hasAnyAuthority('MANAGER')")
    public ResponseEntity<Boolean> upgradeAccount(@Valid @RequestBody UserDTO userDTO, @PathVariable ROLE role) {
        return ResponseEntity.ok(userService.upgrade(userDTO, role));
    }
    
}
