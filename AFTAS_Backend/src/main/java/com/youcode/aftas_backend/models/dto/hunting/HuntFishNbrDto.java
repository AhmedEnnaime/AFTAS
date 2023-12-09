package com.youcode.aftas_backend.models.dto.hunting;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class HuntFishNbrDto {
    @Min(value = 1, message = "number of fish can't be less than 1")
    @NotNull(message = "number of fish is required")
    private int numberOfFish;
}
