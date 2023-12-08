package com.youcode.aftas_backend.models.dto.fish;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FishDto {

    private String name;
    private Double averageWeight;
    private Integer level_id;
}
