package com.youcode.aftas_backend.security.dto;

import java.util.Set;

import com.youcode.aftas_backend.models.dto.role.RoleDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthResponseDTO {

    private String accessToken;
    private Long userId;
    private String userName;
    private Set<RoleDTO> roles;
}
