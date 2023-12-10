package com.youcode.aftas_backend.models.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Getter
@Setter
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
    @NotNull(message = "level id should not be null")
    private Level level;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "fish")
    private List<Hunting> huntings;
}
