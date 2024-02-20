package com.youcode.aftas_backend.models.dto.user;
import java.time.LocalDate;

import com.youcode.aftas_backend.models.dto.role.RoleDTO;
import com.youcode.aftas_backend.models.enums.IdentityDocumentType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserDTO {
    private Integer id;
    private String username;
    private String password;
    private RoleDTO role;
    private String name;
    private String familyName;
    private LocalDate accessionDate;
    private boolean isEnabled;
    private String nationality;
    private IdentityDocumentType identityDocument;
    private String identityNumber;
}
