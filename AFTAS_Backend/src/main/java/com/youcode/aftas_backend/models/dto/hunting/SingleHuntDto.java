package com.youcode.aftas_backend.models.dto.hunting;

import com.youcode.aftas_backend.models.dto.Member.MemberDto;
import com.youcode.aftas_backend.models.dto.competetion.CompetitionDto;
import com.youcode.aftas_backend.models.dto.fish.FishDtoResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class SingleHuntDto {
    private int id;
    private int numberOfFish;
    private FishDtoResponse fish;
    private MemberDto member;
    private CompetitionDto competition;
}
