package com.youcode.aftas_backend.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.youcode.aftas_backend.models.enums.ROLE;
import com.youcode.aftas_backend.services.UserService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "api/users", produces = MediaType.APPLICATION_JSON_VALUE)
@Validated
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/activate/{username}")
    @PreAuthorize("hasAnyAuthority('MANAGER')")
    public ResponseEntity<Map<String, String>> activateAccount(@PathVariable String username) {
        userService.activate(username);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Account enabled successfully.");
        response.put("Enabled Account", username);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/upgrade/{username}/{role}")
    @PreAuthorize("hasAnyAuthority('MANAGER')")
    public ResponseEntity<Map<String, String>> upgradeAccount(@PathVariable String username, @PathVariable ROLE role) {
        userService.upgrade(username, role);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Account upgraded successfully.");
        response.put("New Account Role", role.name());
        return ResponseEntity.ok(response);
    }
    
}
