package com.youcode.aftas_backend.models.dto.hunting;

import com.youcode.aftas_backend.models.dto.MemberDto;
import com.youcode.aftas_backend.models.dto.fish.FishDtoResponse;
import com.youcode.aftas_backend.models.entities.Competition;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class SingleHuntDto {
    private int id;
    private int numberOfFish;
    private FishDtoResponse fish;
    private MemberDto member;
    private Competition competition;
}
