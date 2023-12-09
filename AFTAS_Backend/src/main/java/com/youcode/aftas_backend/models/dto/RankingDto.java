package com.youcode.aftas_backend.models.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.youcode.aftas_backend.models.dto.Member.MemberDto;
import com.youcode.aftas_backend.models.dto.competetion.CompetitionDto;
import com.youcode.aftas_backend.models.embeddables.CompetitionMember;

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

public class RankingDto {
    
    private CompetitionMember id;
    private Integer rank;
    private Integer score;
    
    @JsonIgnoreProperties("rankings")
    private CompetitionDto competition;
    
    @JsonIgnoreProperties("rankings")
    private MemberDto member;
}
