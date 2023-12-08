package com.youcode.aftas_backend.models.entities;

import java.time.LocalDate;
import java.util.List;

import com.youcode.aftas_backend.models.enums.IdentityDocumentType;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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

@Entity
@Table(name= "members")
public class Member {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer num;

    @NotEmpty(message = "Member name is required.")
    @Size(min = 3, max = 255, message = "member name should be between 3 and 255 character.")
    private String name;

    @NotEmpty(message = "Member family name is required.")
    @Size(min = 3, max = 255, message = "member family name should be between 3 and 255 character.")
    private String familyName;

    @NotNull(message = "Member accession date is required.")
    @Column(columnDefinition = "DATE DEFAULT CURRENT_DATE")
    private LocalDate accessionDate;

    @NotEmpty(message = "Member nationality is required")
    private String nationality;

    @NotNull(message = "Member identity document type must not be null.")
    private IdentityDocumentType identityDocument;

    @NotEmpty(message = "Member identity number is required.")
    @Size(min = 3, max = 255, message = "member identity number should be between 3 and 255 character.")
    @Column(unique = true)
    private String identityNumber;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Ranking> rankings;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "member")
    private List<Hunting> huntings;
}
