package com.youcode.aftas_backend.models.dto;

import java.time.LocalDate;
import java.util.List;

import com.youcode.aftas_backend.models.enums.IdentityDocumentType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class MemberDto {
    
    private Integer num;
    private String name;
    private String familyName;
    private LocalDate accessionDate;
    private String nationality;
    private IdentityDocumentType identityDocument;
    private String identityNumber;
    private List<RankingDto> rankings;
}
