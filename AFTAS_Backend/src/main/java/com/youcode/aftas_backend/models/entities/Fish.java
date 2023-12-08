package com.youcode.aftas_backend.models.entities;

import jakarta.persistence.Id;
import lombok.Data;

@Data
public class Fish {

    @Id
    private String name;

    private Double averageWeight;
}
