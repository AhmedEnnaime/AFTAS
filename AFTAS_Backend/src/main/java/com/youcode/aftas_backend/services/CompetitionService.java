package com.youcode.aftas_backend.services;

import java.util.List;

import com.youcode.aftas_backend.models.dto.competetion.CompetitionDto;
import com.youcode.aftas_backend.superClasses.ServiceInterface;

public interface CompetitionService extends ServiceInterface<CompetitionDto, String> {

    List<CompetitionDto> getOnGoingCompetition();
    List<CompetitionDto> getClosedCompetitions();
    List<CompetitionDto> getFutureCompetitions();
}
