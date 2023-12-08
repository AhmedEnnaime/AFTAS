package com.youcode.aftas_backend.models.dto.hunting;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
public class SpecificHuntDto {
    @NotBlank(message = "competition code is required")
    private String competition_code;

    @NotNull(message = "member num is required")
    @Min(value = 1, message = "member number is required")
    private int member_num;

}
