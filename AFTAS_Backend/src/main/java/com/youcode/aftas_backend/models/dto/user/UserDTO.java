package com.youcode.aftas_backend.models.dto.user;

import java.util.Set;

import com.youcode.aftas_backend.models.dto.role.RoleDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserDTO {
    
    private Long id;
    private String username;
    private String password;
    private Set<RoleDTO> roles;
}
