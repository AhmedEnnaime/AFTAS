package com.youcode.aftas_backend.services.Impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.youcode.aftas_backend.models.dto.CompetitionDto;
import com.youcode.aftas_backend.services.CompetitionService;

import lombok.AllArgsConstructor;

@AllArgsConstructor

@Service
public class CompetitionServiceImpl implements CompetitionService {

    private final CompetitionService competitionService;

    @Override
    public CompetitionDto save(CompetitionDto dto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'save'");
    }

    @Override
    public List<CompetitionDto> getAll() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAll'");
    }

    @Override
    public CompetitionDto update(String identifier, CompetitionDto dto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public void delete(String identifier) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }

    @Override
    public CompetitionDto getOnGoingCompetition(LocalDate currentDate) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getOnGoingCompetition'");
    }

    @Override
    public List<CompetitionDto> getClosedCompetitions(LocalDate currentDate) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getClosedCompetitions'");
    }

    @Override
    public List<CompetitionDto> getFutureCompetitions(LocalDate currentDate) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getFutureCompetitions'");
    }

    @Override
    public CompetitionDto findByID(String identifier) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByID'");
    }
    
}
