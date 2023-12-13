package com.youcode.aftas_backend.services;

import java.util.List;

import com.youcode.aftas_backend.models.dto.RankingDto;
import com.youcode.aftas_backend.models.embeddables.CompetitionMember;
import com.youcode.aftas_backend.superClasses.ServiceInterface;

public interface RankingService extends ServiceInterface<RankingDto, CompetitionMember> {
    List<RankingDto> getCompetitionRankings(String competitionCode);
    List<RankingDto> SetUpCompetitionRankings(String competitionCode);
    CompetitionMember deleteRanking(final String competitionCode, final Integer memberNum);
}
