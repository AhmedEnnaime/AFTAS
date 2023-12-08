package com.youcode.aftas_backend.models.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "fishes")
@Builder
public class Fish {

    @Id
    @Size(min = 3, max = 255, message = "Fish name should be between 3 and 255")
    private String name;

    @Column
    @NotNull(message = "average weight can't be null")
    private Double averageWeight;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "level_id")
    private Level level;

    @OneToMany(fetch = FetchType.LAZY)
    private List<Hunting> huntings;
}
