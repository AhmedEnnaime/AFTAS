package com.youcode.aftas_backend.services.Impl;

import java.time.LocalDate;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.youcode.aftas_backend.exceptions.ResourceNotFoundException;
import com.youcode.aftas_backend.models.dto.competetion.CompetitionDto;
import com.youcode.aftas_backend.models.entities.Competition;
import com.youcode.aftas_backend.repositories.CompetitionRepository;
import com.youcode.aftas_backend.services.CompetitionService;

import lombok.AllArgsConstructor;

@AllArgsConstructor

@Service
public class CompetitionServiceImpl implements CompetitionService {

    private final CompetitionRepository competitionRepository;
    private final ModelMapper modelMapper;

    @Override
    public CompetitionDto save(final CompetitionDto competitionDto) {
        Competition competitionEntity = modelMapper.map(competitionDto, Competition.class);
        Competition savedCompetition = competitionRepository.save(competitionEntity);
        return modelMapper.map(savedCompetition, CompetitionDto.class);
    }

    @Override
    public List<CompetitionDto> getAll() {
        List<Competition> competetions = competitionRepository.findAll();
        return competetions.stream()
                           .map(competition -> modelMapper.map(competition, CompetitionDto.class))
                           .toList();
    }

    @Override
    public CompetitionDto update(String identifier, CompetitionDto competitionDto) {
        competitionDto.setCode(identifier);
        Competition competitionEntity = modelMapper.map(competitionDto, Competition.class);
        competitionRepository.save(competitionEntity);
        return modelMapper.map(competitionEntity, CompetitionDto.class);
    }

    @Override
    public void delete(String identifier) {
        competitionRepository.deleteById(identifier);
    }

    @Override
    public CompetitionDto findByID(String identifier) {
        Competition foundedCompetition = competitionRepository.findById(identifier)
                    .orElseThrow(() -> new ResourceNotFoundException("The competition with id " + identifier + " does not exist."));
        return modelMapper.map(foundedCompetition, CompetitionDto.class);
    }

    @Override
    public CompetitionDto getOnGoingCompetition(LocalDate currentDate) {
        Competition foundedCompetition = competitionRepository.findByDate(currentDate);
        return modelMapper.map(foundedCompetition, CompetitionDto.class);
    }

    @Override
    public List<CompetitionDto> getClosedCompetitions(LocalDate currentDate) {
        List<Competition> foundedCompetitions = competitionRepository.findByDateBefore(currentDate);
        return foundedCompetitions.stream()
                                  .map(competition -> modelMapper.map(competition, CompetitionDto.class))
                                  .toList();
    }

    @Override
    public List<CompetitionDto> getFutureCompetitions(LocalDate currentDate) {
        List<Competition> foundedCompetitions = competitionRepository.findByDateAfter(currentDate);
        return foundedCompetitions.stream()
                                  .map(competition -> modelMapper.map(competition, CompetitionDto.class))
                                  .toList();
    }
    
}
