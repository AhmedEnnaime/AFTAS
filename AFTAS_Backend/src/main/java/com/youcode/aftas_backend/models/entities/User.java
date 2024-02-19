package com.youcode.aftas_backend.models.entities;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.youcode.aftas_backend.models.enums.IdentityDocumentType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
@Entity
public class User implements UserDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private Integer id;

    @Column(unique = true, nullable = false)
    private String username;

    private String password;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role")
    private Role role;

    @NotEmpty(message = "Member name is required.")
    @Size(min = 3, max = 255, message = "member name should be between 3 and 255 character.")
    private String name;

    @NotEmpty(message = "Member family name is required.")
    @Size(min = 3, max = 255, message = "member family name should be between 3 and 255 character.")
    private String familyName;

    @CreationTimestamp
    @Temporal(value = TemporalType.DATE)
    private LocalDate accessionDate;

    @NotEmpty(message = "Member nationality is required")
    private String nationality;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private IdentityDocumentType identityDocument;

    @NotEmpty(message = "Member identity number is required.")
    @Size(min = 3, max = 255, message = "member identity number should be between 3 and 255 character.")
    @Column(unique = true)
    private String identityNumber;

    @Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
    private boolean isEnabled;

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(role);
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }
}
