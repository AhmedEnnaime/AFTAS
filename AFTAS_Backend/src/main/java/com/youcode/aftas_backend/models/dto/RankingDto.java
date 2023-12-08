package com.youcode.aftas_backend.models.dto;

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
    private CompetitionDto competition;
    private MemberDto member;
}
