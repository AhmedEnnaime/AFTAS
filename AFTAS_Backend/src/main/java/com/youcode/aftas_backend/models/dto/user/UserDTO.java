package com.youcode.aftas_backend.models.dto.user;
import java.time.LocalDate;
import com.youcode.aftas_backend.models.enums.IdentityDocumentType;
import com.youcode.aftas_backend.models.enums.ROLE;

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
    private String name;
    private String familyName;
    private ROLE role;
    private LocalDate accessionDate;
    private String nationality;
    private boolean isEnabled;
    private IdentityDocumentType identityDocument;
    private String identityNumber;
}
