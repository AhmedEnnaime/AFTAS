package com.youcode.aftas_backend.models.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LevelDto {
    private Long code;
    private String description;
    private Integer points;
}
