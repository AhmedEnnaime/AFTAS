package com.youcode.aftas_backend.services;

import java.time.LocalDate;
import java.util.List;

import com.youcode.aftas_backend.models.dto.competetion.CompetitionDto;
import com.youcode.aftas_backend.superClasses.ServiceInterface;

public interface CompetitionService extends ServiceInterface<CompetitionDto, String> {

    CompetitionDto getOnGoingCompetition(LocalDate currentDate);
    List<CompetitionDto> getClosedCompetitions(LocalDate currentDate);
    List<CompetitionDto> getFutureCompetitions(LocalDate currentDate);
    CompetitionDto getResult(String identifier);
}
