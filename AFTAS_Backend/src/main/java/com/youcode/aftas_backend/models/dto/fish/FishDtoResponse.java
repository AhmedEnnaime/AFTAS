package com.youcode.aftas_backend.models.dto.fish;

import com.youcode.aftas_backend.models.dto.LevelDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FishDtoResponse {

    private String name;
    private Double averageWeight;
    private LevelDto level;
}
