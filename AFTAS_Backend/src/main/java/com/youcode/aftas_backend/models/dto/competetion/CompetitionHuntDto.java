package com.youcode.aftas_backend.models.dto.competetion;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.youcode.aftas_backend.models.dto.Member.MemberDto;
import com.youcode.aftas_backend.models.dto.fish.FishDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class CompetitionHuntDto {

    private Integer numberOfFish;
    private FishDto fish;
    private MemberDto member;

    @JsonIgnoreProperties("huntings")
    private CompetitionDto competition;
}
