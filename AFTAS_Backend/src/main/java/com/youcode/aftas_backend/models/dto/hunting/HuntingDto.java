package com.youcode.aftas_backend.models.dto.hunting;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class HuntingDto {
    @Min(value = 1, message="the number of fish can't be less than 1")
    @NotNull(message = "the number of fish is required")
    private int numberOfFish;

    @NotBlank(message = "fish name is required")
    private String fish_name;

    @Min(value = 1, message="member id can't be less than 1")
    @NotNull(message = "member id is required")
    private int member_num;

    @NotBlank(message = "competition code is required")
    private String competition_code;
}
