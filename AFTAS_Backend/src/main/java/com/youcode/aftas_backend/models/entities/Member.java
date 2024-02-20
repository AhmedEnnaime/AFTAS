package com.youcode.aftas_backend.models.entities;

import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name= "members")
public class Member extends User {

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Ranking> rankings;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "member")
    private List<Hunting> huntings;

}
