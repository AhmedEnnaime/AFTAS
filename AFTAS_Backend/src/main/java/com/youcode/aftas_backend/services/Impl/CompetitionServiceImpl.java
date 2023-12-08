package com.youcode.aftas_backend.services.Impl;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.youcode.aftas_backend.exceptions.ResourceNotFoundException;
import com.youcode.aftas_backend.models.dto.competetion.CompetitionDto;
import com.youcode.aftas_backend.models.entities.Competition;
import com.youcode.aftas_backend.repositories.CompetitionRepository;
import com.youcode.aftas_backend.services.CompetitionService;
import com.youcode.aftas_backend.services.RankingService;

import lombok.AllArgsConstructor;

@AllArgsConstructor

@Service
public class CompetitionServiceImpl implements CompetitionService {

    private final CompetitionRepository competitionRepository;
    private final RankingService rankingService;
    private final ModelMapper modelMapper;

    @Override
    public CompetitionDto save(final CompetitionDto competitionDto) {            
        Competition competitionEntity = modelMapper.map(competitionDto, Competition.class);
        return 
            modelMapper.map(competitionRepository.save(competitionEntity),
             CompetitionDto.class);
    }

    @Override
    public List<CompetitionDto> getAll() {
        return Arrays.asList(modelMapper.map(competitionRepository.findAll(),
                            CompetitionDto[].class));
    }

    @Override
    public CompetitionDto update(String identifier, CompetitionDto competitionDto) {
        if(!competitionRepository.existsById(identifier)) 
            throw new ResourceNotFoundException("The competition with id " + identifier + " does not exist.");
        competitionDto.setCode(identifier);
        Competition competitionEntity = modelMapper.map(competitionDto, Competition.class);
        competitionRepository.save(competitionEntity);
        return modelMapper.map(competitionEntity, CompetitionDto.class);
    }

    @Override
    public void delete(String identifier) {
        if(!competitionRepository.existsById(identifier)) 
            throw new ResourceNotFoundException("The competition with id " + identifier + " does not exist.");
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
        return modelMapper.map(competitionRepository.findByDate(currentDate), 
               CompetitionDto.class);
    }

    @Override
    public List<CompetitionDto> getClosedCompetitions(LocalDate currentDate) {
        return Arrays.asList(modelMapper.map(competitionRepository.findByDateBefore(currentDate),
                            CompetitionDto[].class));
    }

    @Override
    public List<CompetitionDto> getFutureCompetitions(LocalDate currentDate) {
        return Arrays.asList(modelMapper.map(competitionRepository.findByDateAfter(currentDate),
                            CompetitionDto[].class));
    }

    @Override
    public CompetitionDto getResult(String identifier) {
        if(!competitionRepository.existsById(identifier)) 
            throw new ResourceNotFoundException("The competition with id " + identifier + " does not exist.");
        rankingService.SetUpCompetitionRankings(identifier);
        return findByID(identifier);
    }
    
}
