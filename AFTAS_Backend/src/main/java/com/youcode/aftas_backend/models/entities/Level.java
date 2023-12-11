package com.youcode.aftas_backend.models.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "levels")
@Builder
public class Level {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer code;

    @Column
    @NotBlank(message = "description can't be null")
    @NotNull(message = "description can't be empty")
    private String description;

    @Column
    @Min(value = 0, message = "the minimum value is 0")
    private Integer points;

    @OneToMany(mappedBy = "level", fetch = FetchType.EAGER)
    private List<Fish> fishes;
}
