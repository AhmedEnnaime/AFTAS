package com.youcode.aftas_backend.models.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LevelDto {
    private Integer code;
    private String description;
    private Integer points;
}
