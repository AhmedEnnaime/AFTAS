package com.youcode.aftas_backend.services;

import java.util.List;

import com.youcode.aftas_backend.models.dto.competetion.CompetitionDto;
import com.youcode.aftas_backend.superClasses.ServiceInterface;
import org.springframework.data.domain.Page;

public interface CompetitionService extends ServiceInterface<CompetitionDto, String> {

    Page<CompetitionDto> getAllCompetitions(final Integer page, final Integer size);
    Page<CompetitionDto> getOnGoingCompetition(final Integer page, final Integer size);
    Page<CompetitionDto> getClosedCompetitions(final Integer page, final Integer size);
    Page<CompetitionDto> getFutureCompetitions(final Integer page, final Integer size);
}
