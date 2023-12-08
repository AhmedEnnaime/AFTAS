package com.youcode.aftas_backend.models.dto.hunting;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
public class HuntFishNbrDto {
    @Min(value = 1, message = "number of fish can't be less than 1")
    @NotNull(message = "number of fish is required")
    private int numberOfFish;
}
