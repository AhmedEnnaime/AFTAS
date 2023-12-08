package com.youcode.aftas_backend.models.dto.fish;

import com.youcode.aftas_backend.models.dto.LevelDto;
import com.youcode.aftas_backend.models.entities.Level;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FishDtoResponse {

    private String name;
    private Double averageWeight;
    private LevelDto level;
}
