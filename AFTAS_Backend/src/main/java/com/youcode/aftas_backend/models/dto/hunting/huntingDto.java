package com.youcode.aftas_backend.models.dto.hunting;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class huntingDto {
    @Min(value = 1, message="the number of fish can't be less than 1")
    @NotNull(message = "the number of fish is required")
    private int numberOfFish;

    @Min(value = 1, message = "fish id can't be less then 1")
    @NotNull(message = "fish id is required")
    private int fish_id;

    @Min(value = 1, message="member id can't be less than 1")
    @NotNull(message = "member id is required")
    private int member_id;

    @Min(value = 1, message="competition id can't be less than 1")
    @NotNull(message = "competition id is required")
    private int competition_id;
}
