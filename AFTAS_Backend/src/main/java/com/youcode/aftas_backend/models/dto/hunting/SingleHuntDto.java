package com.youcode.aftas_backend.models.dto.hunting;

import com.youcode.aftas_backend.models.dto.Member.MemberDto;
import com.youcode.aftas_backend.models.dto.fish.FishDtoResponse;
import com.youcode.aftas_backend.models.entities.Competition;

public class SingleHuntDto {
    private int id;
    private int numberOfFish;
    private FishDtoResponse fish;
    private MemberDto member;
    private Competition competition;
}
