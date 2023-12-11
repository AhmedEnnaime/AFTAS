package com.youcode.aftas_backend.services;

import java.util.List;

import com.youcode.aftas_backend.models.dto.competetion.CompetitionDto;
import com.youcode.aftas_backend.superClasses.ServiceInterface;

public interface CompetitionService extends ServiceInterface<CompetitionDto, String> {

    List<CompetitionDto> getAllCompetitions(final Integer page, final Integer size);
    List<CompetitionDto> getOnGoingCompetition(final Integer page, final Integer size);
    List<CompetitionDto> getClosedCompetitions(final Integer page, final Integer size);
    List<CompetitionDto> getFutureCompetitions(final Integer page, final Integer size);
}
